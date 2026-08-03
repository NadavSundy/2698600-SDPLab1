"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createTask as insertTask,
  updateTask as saveTaskChanges,
} from "@/lib/taskRepository";

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

  insertTask({
    title,
    description,
    dueDate,
    topic,
    status: statusValue,
  });

  revalidatePath("/");
}

export async function updateTaskAction(
  formData: FormData,
): Promise<void> {
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const description = String(
    formData.get("description") ?? "",
  ).trim();
  const dueDate = String(formData.get("dueDate") ?? "");
  const topic = String(formData.get("topic") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "TODO");

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid task ID.");
  }

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

  saveTaskChanges({
    id,
    title,
    description,
    dueDate,
    topic,
    status: statusValue,
  });

  revalidatePath("/");
  redirect("/");
}