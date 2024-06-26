export type TaskTab = {
  id: string;
  title: string;
};

export type AddTaskTab = Omit<TaskTab, 'id'>;

export type EditTaskTab = {
  id: TaskTab['id'];
  data: AddTaskTab;
};

export type DeleteTaskTab = TaskTab['id'];
