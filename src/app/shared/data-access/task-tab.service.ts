import { Injectable, computed, signal } from '@angular/core';
import { AddTaskTab, TaskTab } from '../types/task-tab.type';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type TaskTabState = {
  taskTabList: TaskTab[];
};

@Injectable({
  providedIn: 'root',
})
export class TaskTabService {
  // state
  private state = signal<TaskTabState>({
    taskTabList: [],
  });

  // selectors
  public taskTabList = computed(() => this.state().taskTabList);

  // actions
  public add$ = new Subject<AddTaskTab>();

  constructor() {
    // reducers
    this.add$.pipe(takeUntilDestroyed()).subscribe((taskTab) =>
      this.state.update((state) => ({
        ...state,
        taskTabList: [...state.taskTabList, this.addIdToTaskTab(taskTab)],
      })),
    );
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
