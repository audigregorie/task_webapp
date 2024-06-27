import { Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { TaskTab } from '../types/task-tab.type';
import { of } from 'rxjs';
import { TaskItem } from '../types/task-item.type';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'window local storage object',
  {
    providedIn: 'root',
    factory: () => {
      return inject(PLATFORM_ID) === 'browser'
        ? window.localStorage
        : ({} as Storage);
    },
  },
);

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public storage = inject(LOCAL_STORAGE);

  constructor() {}

  public loadTaskTabList() {
    const taskTabList = this.storage.getItem('taskTabList');
    return of(taskTabList ? (JSON.parse(taskTabList) as TaskTab[]) : []);
  }

  public loadTaskItemList() {
    const taskItemList = this.storage.getItem('taskItemList');
    return of(taskItemList ? (JSON.parse(taskItemList) as TaskItem[]) : []);
  }

  public saveTaskTabList(taskTabList: TaskTab[]) {
    this.storage.setItem('taskTabList', JSON.stringify(taskTabList));
  }

  public saveTaskItemList(taskItemList: TaskItem[]) {
    this.storage.setItem('taskItemList', JSON.stringify(taskItemList));
  }
}
