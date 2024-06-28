import { DeleteTaskTab } from './task-tab.type';

export type TaskItem = {
  id: string;
  taskTabId: string;
  title: string;
  checked: boolean;
};

export type CreateTaskItem = {
  item: Omit<TaskItem, 'id' | 'taskTabId' | 'checked'>;
  taskTabId: DeleteTaskTab;
};

export type UpdateTaskItem = {
  id: TaskItem['id'];
  data: CreateTaskItem['item'];
};

export type DeleteTaskItem = TaskItem['id'];
