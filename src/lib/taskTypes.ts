export const TASK_STATUSES = [
  "TODO",
  "IN_PROGRESS",
  "COMPLETE",
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  topic: string;
  status: TaskStatus;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description: string;
  dueDate: string;
  topic: string;
  status: TaskStatus;
};