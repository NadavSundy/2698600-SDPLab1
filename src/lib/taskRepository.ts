import type Database from "better-sqlite3";

import { db } from "@/lib/db";
import type {
  CreateTaskInput,
  Task,
  TaskStatus,
} from "@/lib/taskTypes";

type TaskRow = {
  id: number;
  title: string;
  description: string;
  due_date: string;
  topic: string;
  status: TaskStatus;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
};

function mapTaskRow(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    dueDate: row.due_date,
    topic: row.topic,
    status: row.status,
    archivedAt: row.archived_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createTask(
  input: CreateTaskInput,
  database: Database.Database = db,
): Task {
  const statement = database.prepare(`
    INSERT INTO tasks (
      title,
      description,
      due_date,
      topic,
      status
    )
    VALUES (
      @title,
      @description,
      @dueDate,
      @topic,
      @status
    )
  `);

  const result = statement.run({
    title: input.title.trim(),
    description: input.description.trim(),
    dueDate: input.dueDate,
    topic: input.topic.trim(),
    status: input.status,
  });

  const row = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE id = ?
      `,
    )
    .get(result.lastInsertRowid) as TaskRow;

  return mapTaskRow(row);
}

export function getActiveTasks(
  database: Database.Database = db,
): Task[] {
  const rows = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE archived_at IS NULL
        ORDER BY created_at DESC, id DESC
      `,
    )
    .all() as TaskRow[];

  return rows.map(mapTaskRow);
}