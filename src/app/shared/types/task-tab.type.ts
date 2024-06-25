export type TaskTab = {
  id: string;
  title: string;
};

export type AddTaskTab = {
  title: string;
};

export type UpdateTaskTab = {
  id: TaskTab['id'];
  data: AddTaskTab;
};

export type DeleteTaskTab = {
  id: TaskTab['id'];
};
