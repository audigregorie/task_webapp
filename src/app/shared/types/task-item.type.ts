import { DeleteTaskTab } from './task-tab.type';

export type TaskItem = {
  taskTabId: string;
  id: string;
  title: string;
  checked: boolean;
};

export type AddTaskItem = {
  item: Omit<TaskItem, 'id' | 'taskTabId' | 'checked'>;
  taskTabId: DeleteTaskTab;
};
export type EditTaskItem = {
  id: TaskItem['id'];
  data: AddTaskItem['item'];
};

export type DeleteTaskItem = TaskItem['id'];
