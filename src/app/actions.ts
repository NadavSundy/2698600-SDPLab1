"use server";

import { revalidatePath } from "next/cache";

import { createTask } from "@/lib/taskRepository";
import {
  TASK_STATUSES,
  type TaskStatus,
} from "@/lib/taskTypes";

function isTaskStatus(value: string): value is TaskStatus {
  return TASK_STATUSES.includes(value as TaskStatus);
}

export async function createTaskAction(
  formData: FormData,
): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(
    formData.get("description") ?? "",
  ).trim();
  const dueDate = String(formData.get("dueDate") ?? "");
  const topic = String(formData.get("topic") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "TODO");

  if (!title) {
    throw new Error("A task title is required.");
  }

  if (!topic) {
    throw new Error("A task topic is required.");
  }

  if (!dueDate) {
    throw new Error("A due date is required.");
  }

  if (!isTaskStatus(statusValue)) {
    throw new Error("Invalid task status.");
  }

  createTask({
    title,
    description,
    dueDate,
    topic,
    status: statusValue,
  });

  revalidatePath("/");
}