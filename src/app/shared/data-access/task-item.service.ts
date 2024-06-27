import { Injectable, computed, signal } from '@angular/core';
import { AddTaskItem, DeleteTaskItem, TaskItem } from '../types/task-item.type';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type TaskItemState = {
  taskItemList: TaskItem[];
};

@Injectable({
  providedIn: 'root',
})
export class TaskItemService {
  // state
  private state = signal<TaskItemState>({
    taskItemList: [],
  });

  // selectors
  public taskItemList = computed(() => this.state().taskItemList);

  // actions
  public add$ = new Subject<AddTaskItem>();
  public toggle$ = new Subject<DeleteTaskItem>();

  constructor() {
    // reducers
    // add task item
    this.add$.pipe(takeUntilDestroyed()).subscribe((taskItem) =>
      this.state.update((state) => ({
        ...state,
        taskItemList: [
          ...state.taskItemList,
          {
            ...taskItem.item,
            id: Date.now.toString(),
            taskTabId: taskItem.taskTabId,
            checked: false,
          },
        ],
      })),
    );

    // toggle item checked/unchecked
    this.toggle$.pipe(takeUntilDestroyed()).subscribe((taskItemId) =>
      this.state.update((state) => ({
        ...state,
        taskItemList: state.taskItemList.map((taskItem) =>
          taskItem.id === taskItemId
            ? {
                ...taskItem,
                checked: !taskItem.checked,
              }
            : taskItem,
        ),
      })),
    );
  }
}
