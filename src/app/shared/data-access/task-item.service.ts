import { Injectable, computed, effect, inject, signal } from '@angular/core';
import {
  CreateTaskItem,
  DeleteTaskItem,
  TaskItem,
  UpdateTaskItem,
} from '../types/task-item.type';
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
  public create$ = new Subject<CreateTaskItem>();
  public toggle$ = new Subject<DeleteTaskItem>();
  public reset$ = new Subject<DeleteTaskItem>();
  public update$ = new Subject<UpdateTaskItem>();
  public delete$ = new Subject<DeleteTaskItem>();
  public deleteTaskTab$ = new Subject<DeleteTaskTab>();
  public taskItemListLoaded$ = this.storageService.loadTaskItemList();

  constructor() {
    // reducers
    // create task item
    this.create$.pipe(takeUntilDestroyed()).subscribe((createItem) =>
      this.state.update((state) => ({
        ...state,
        taskItemList: [
          ...state.taskItemList,
          {
            ...createItem.item,
            id: Date.now().toString(),
            taskTabId: createItem.taskTabId,
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
            ? { ...taskItem, checked: !taskItem.checked }
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

    // edit item
    this.update$.pipe(takeUntilDestroyed()).subscribe((updateId) =>
      this.state.update((state) => ({
        ...state,
        taskItemList: state.taskItemList.map((taskItem) =>
          taskItem.id === updateId.id
            ? { ...taskItem, title: updateId.data.title }
            : taskItem,
        ),
      })),
    );

    // delete
    this.delete$.pipe(takeUntilDestroyed()).subscribe((deleteId) =>
      this.state.update((state) => ({
        ...state,
        taskItemList: state.taskItemList.filter(
          (taskItem) => taskItem.id !== deleteId,
        ),
      })),
    );

    // delete task tab
    this.deleteTaskTab$
      .pipe(takeUntilDestroyed())
      .subscribe((deleteTaskTabId) =>
        this.state.update((state) => ({
          ...state,
          taskItemList: state.taskItemList.filter(
            (taskItem) => taskItem.taskTabId !== deleteTaskTabId,
          ),
        })),
      );

    // effect
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveTaskItemList(this.taskItemList());
      }
    });
  }
}
