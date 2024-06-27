import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AddTaskItem, DeleteTaskItem, TaskItem } from '../types/task-item.type';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeleteTaskTab } from '../types/task-tab.type';
import { StorageService } from './storage.service';

export type TaskItemState = {
  taskItemList: TaskItem[];
  loaded: boolean;
  error: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class TaskItemService {
  private storageService = inject(StorageService);
  // state
  private state = signal<TaskItemState>({
    taskItemList: [],
    loaded: false,
    error: null,
  });

  // selectors
  public taskItemList = computed(() => this.state().taskItemList);
  public loaded = computed(() => this.state().loaded);

  // actions
  public add$ = new Subject<AddTaskItem>();
  public toggle$ = new Subject<DeleteTaskItem>();
  public reset$ = new Subject<DeleteTaskTab>();
  public taskItemListLoaded$ = this.storageService.loadTaskItemList();

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

    // reset items checked
    this.reset$.pipe(takeUntilDestroyed()).subscribe((taskTabId) =>
      this.state.update((state) => ({
        ...state,
        taskItemList: state.taskItemList.map((taskItem) =>
          taskItem.taskTabId === taskTabId
            ? {
                ...taskItem,
                checked: false,
              }
            : taskItem,
        ),
      })),
    );

    // task item list loaded from storage
    this.taskItemListLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (taskItemList) =>
        this.state.update((state) => ({
          ...state,
          taskItemList,
          loaded: true,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });

    // effect
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveTaskItemList(this.taskItemList());
      }
    });
  }
}
