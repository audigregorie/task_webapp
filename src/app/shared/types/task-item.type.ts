import { TaskTab } from './task-tab.type';

export type TaskItem = {
  taskTabId: TaskTab['id'];
  id: string;
  title: string;
  checked: boolean;
};

export type AddTaskItem = {
  title: Omit<TaskItem, 'id' | 'taskTabId' | 'checked'>;
  taskTabId: DeleteTaskItem;
};
export type UpdateTaskItem = {
  id: TaskItem['id'];
  data: AddTaskItem['title'];
};

export type DeleteTaskItem = TaskItem['id'];
