import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AddTaskTab, TaskTab } from '../types/task-tab.type';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from './storage.service';

export type TaskTabState = {
  taskTabList: TaskTab[];
  loaded: boolean;
  error: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class TaskTabService {
  private storageService = inject(StorageService);
  // state
  private state = signal<TaskTabState>({
    taskTabList: [],
    loaded: false,
    error: null,
  });

  // selectors
  public taskTabList = computed(() => this.state().taskTabList);
  public loaded = computed(() => this.state().loaded);

  // actions
  public add$ = new Subject<AddTaskTab>();
  public taskTabListLoaded$ = this.storageService.loadTaskTabList();

  constructor() {
    // reducers
    // add
    this.add$.pipe(takeUntilDestroyed()).subscribe((taskTab) =>
      this.state.update((state) => ({
        ...state,
        taskTabList: [...state.taskTabList, this.addIdToTaskTab(taskTab)],
      })),
    );

    // task tab list loaded from storage
    this.taskTabListLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (taskTabList) =>
        this.state.update((state) => ({ ...state, taskTabList })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });

    // effect
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveTaskTabList(this.taskTabList());
      }
    });
  }

  // add id to the task tab
  private addIdToTaskTab(taskTab: AddTaskTab) {
    return {
      ...taskTab,
      id: this.generateSlug(taskTab.title),
    };
  }

  // transform the title if duplicate is found
  private generateSlug(title: string) {
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    const duplicateSlug = this.taskTabList().find(
      (taskTab) => taskTab.id === slug,
    );

    if (duplicateSlug) {
      slug = slug + Date.now().toString();
    }

    return slug;
  }
}
