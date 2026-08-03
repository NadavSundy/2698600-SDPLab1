import type { Task } from "@/lib/taskTypes";

export function isTaskOverdue(
  task: Pick<Task, "dueDate" | "status">,
  today = new Date(),
): boolean {
  if (task.status === "COMPLETE") {
    return false;
  }

  const currentDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return task.dueDate < currentDate;
}