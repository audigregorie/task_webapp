import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { CreateTaskTab, UpdateTaskTab, TaskTab } from '../types/task-tab.type';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from './storage.service';
import { TaskItemService } from './task-item.service';

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
  private taskItemService = inject(TaskItemService);

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
  public taskTabListLoaded$ = this.storageService.loadTaskTabList();
  public create$ = new Subject<CreateTaskTab>();
  public update$ = new Subject<UpdateTaskTab>();
  public delete$ = this.taskItemService.deleteTaskTab$;

  constructor() {
    // reducers
    // add
    this.create$.pipe(takeUntilDestroyed()).subscribe((createTab) =>
      this.state.update((state) => ({
        ...state,
        taskTabList: [...state.taskTabList, this.addIdToTaskTab(createTab)],
      })),
    );

    // task tab list loaded from storage
    this.taskTabListLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (loadList) =>
        this.state.update((state) => ({ ...state, loadList, loaded: true })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });

    // delete task tab, deletes task item list as well
    this.delete$.pipe(takeUntilDestroyed()).subscribe((deleteId) =>
      this.state.update((state) => ({
        ...state,
        taskTabList: state.taskTabList.filter(
          (taskTab) => taskTab.id !== deleteId,
        ),
      })),
    );

    // edit task tab
    this.update$.pipe(takeUntilDestroyed()).subscribe((updateId) =>
      this.state.update((state) => ({
        ...state,
        taskTabList: state.taskTabList.map((taskTab) =>
          taskTab.id === updateId.id
            ? { ...taskTab, title: updateId.data.title }
            : taskTab,
        ),
      })),
    );

    // effect
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveTaskTabList(this.taskTabList());
      }
    });
  }

  // add id to the task tab
  private addIdToTaskTab(taskTab: CreateTaskTab) {
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
