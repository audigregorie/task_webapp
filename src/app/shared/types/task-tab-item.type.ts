import { TaskTab } from './task-tab.type';

export type TaskTabItem = {
  taskTabId: TaskTab['id'];
  id: string;
  title: string;
  checked: boolean;
};

export type AddTaskTabItem = {
  title: Omit<TaskTabItem, 'id' | 'checklistId' | 'checked'>;
  taskTabId: DeleteTaskTabItem;
};
export type UpdateTaskTabItem = {
  id: TaskTabItem['id'];
  data: AddTaskTabItem['title'];
};

export type DeleteTaskTabItem = TaskTabItem['id'];
