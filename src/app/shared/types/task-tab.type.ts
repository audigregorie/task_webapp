export interface TaskTab {
  id: string;
  title: string;
}

export type CreateTaskTab = Omit<TaskTab, 'id'>;

export type UpdateTaskTab = { id: TaskTab['id']; data: CreateTaskTab };

export type DeleteTaskTab = TaskTab['id'];
