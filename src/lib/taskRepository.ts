import type Database from "better-sqlite3";

import { db } from "@/lib/db";
import type {
  CreateTaskInput,
  Task,
  TaskSortOption,
  TaskStatus,
  UpdateTaskInput,
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
  sort: TaskSortOption = "created",
  database: Database.Database = db,
): Task[] {
  const orderBy: Record<TaskSortOption, string> = {
    created: "created_at DESC, id DESC",
    topic: "topic COLLATE NOCASE ASC, id DESC",
    status: `
      CASE status
        WHEN 'TODO' THEN 1
        WHEN 'IN_PROGRESS' THEN 2
        WHEN 'COMPLETE' THEN 3
      END ASC,
      id DESC
    `,
    dueDate: "due_date ASC, id DESC",
  };

  const rows = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE archived_at IS NULL
        ORDER BY ${orderBy[sort]}
      `,
    )
    .all() as TaskRow[];

  return rows.map(mapTaskRow);
}

export function getTaskById(
  id: number,
  database: Database.Database = db,
): Task | null {
  const row = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE id = ?
      `,
    )
    .get(id) as TaskRow | undefined;

  return row ? mapTaskRow(row) : null;
}

export function updateTask(
  input: UpdateTaskInput,
  database: Database.Database = db,
): Task {
  const result = database
    .prepare(
      `
        UPDATE tasks
        SET
          title = @title,
          description = @description,
          due_date = @dueDate,
          topic = @topic,
          status = @status,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = @id
      `,
    )
    .run({
      id: input.id,
      title: input.title.trim(),
      description: input.description.trim(),
      dueDate: input.dueDate,
      topic: input.topic.trim(),
      status: input.status,
    });

  if (result.changes === 0) {
    throw new Error("Task not found.");
  }

  const updatedTask = getTaskById(input.id, database);

  if (!updatedTask) {
    throw new Error("Updated task could not be loaded.");
  }

  return updatedTask;
}

export function archiveTask(
  id: number,
  database: Database.Database = db,
): Task {
  const result = database
    .prepare(
      `
        UPDATE tasks
        SET
          archived_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
          AND archived_at IS NULL
      `,
    )
    .run(id);

  if (result.changes === 0) {
    throw new Error("Active task not found.");
  }

  const archivedTask = getTaskById(id, database);

  if (!archivedTask) {
    throw new Error("Archived task could not be loaded.");
  }

  return archivedTask;
}

export function getArchivedTasks(
  database: Database.Database = db,
): Task[] {
  const rows = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE archived_at IS NOT NULL
        ORDER BY archived_at DESC, id DESC
      `,
    )
    .all() as TaskRow[];

  return rows.map(mapTaskRow);
}