import { Injectable, computed, signal } from '@angular/core';
import { AddTaskTabItem, TaskTabItem } from '../types/task-tab-item.type';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type TaskTabItemState = {
  taskTabItemList: TaskTabItem[];
};

@Injectable({
  providedIn: 'root',
})
export class TaskTabItemService {
  // state
  private state = signal<TaskTabItemState>({
    taskTabItemList: [],
  });

  // selectors
  public taskTabItemList = computed(() => this.state().taskTabItemList);

  // actions
  add$ = new Subject<AddTaskTabItem>();

  constructor() {
    // reducers
    this.add$.pipe(takeUntilDestroyed()).subscribe((taskTabItem) =>
      this.state.update((state) => ({
        ...state,
        taskTabItem: [
          ...state.taskTabItemList,
          {
            ...taskTabItem.title,
            id: Date.now.toString(),
            taskTabId: taskTabItem.taskTabId,
            checked: false,
          },
        ],
      })),
    );
  }
}
