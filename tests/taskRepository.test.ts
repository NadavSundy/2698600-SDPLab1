import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

vi.mock("@/lib/db", () => ({
  db: undefined,
}));

import {
  archiveTask,
  createTask,
  getActiveTasks,
  getArchivedTasks,
} from "@/lib/taskRepository";
import { isTaskOverdue } from "@/lib/taskRules";

let database: Database.Database;

beforeEach(() => {
  database = new Database(":memory:");

  const schema = fs.readFileSync(
    path.join(process.cwd(), "database", "schema.sql"),
    "utf8",
  );

  database.exec(schema);
});

afterEach(() => {
  database.close();
});

describe("task repository", () => {
  it("creates a task containing all required fields", () => {
    const task = createTask(
      {
        title: "  Finish lab  ",
        description: "Write the automated tests",
        dueDate: "2026-08-04",
        topic: "  COMS3011A  ",
        status: "TODO",
      },
      database,
    );

    expect(task).toMatchObject({
      title: "Finish lab",
      description: "Write the automated tests",
      dueDate: "2026-08-04",
      topic: "COMS3011A",
      status: "TODO",
      archivedAt: null,
    });

    expect(
      getActiveTasks("created", database),
    ).toHaveLength(1);
  });

  it("archives a task without deleting its record", () => {
    const task = createTask(
      {
        title: "Archive me",
        description: "The record must remain viewable",
        dueDate: "2026-08-05",
        topic: "Testing",
        status: "IN_PROGRESS",
      },
      database,
    );

    archiveTask(task.id, database);

    expect(
      getActiveTasks("created", database),
    ).toHaveLength(0);

    const archivedTasks = getArchivedTasks(database);

    expect(archivedTasks).toHaveLength(1);
    expect(archivedTasks[0].id).toBe(task.id);
    expect(archivedTasks[0].archivedAt).not.toBeNull();
  });

  it("sorts active tasks by topic, status and due date", () => {
    createTask(
      {
        title: "Task Z",
        description: "",
        dueDate: "2026-08-06",
        topic: "Zulu",
        status: "COMPLETE",
      },
      database,
    );

    createTask(
      {
        title: "Task A",
        description: "",
        dueDate: "2026-08-04",
        topic: "Alpha",
        status: "TODO",
      },
      database,
    );

    createTask(
      {
        title: "Task M",
        description: "",
        dueDate: "2026-08-05",
        topic: "Mike",
        status: "IN_PROGRESS",
      },
      database,
    );

    expect(
      getActiveTasks("topic", database).map(
        (task) => task.topic,
      ),
    ).toEqual([
      "Alpha",
      "Mike",
      "Zulu",
    ]);

    expect(
      getActiveTasks("status", database).map(
        (task) => task.status,
      ),
    ).toEqual([
      "TODO",
      "IN_PROGRESS",
      "COMPLETE",
    ]);

    expect(
      getActiveTasks("dueDate", database).map(
        (task) => task.dueDate,
      ),
    ).toEqual([
      "2026-08-04",
      "2026-08-05",
      "2026-08-06",
    ]);
  });
});

describe("overdue rule", () => {
  const today = new Date(2026, 7, 3);

  it("flags only incomplete tasks whose due date has passed", () => {
    expect(
      isTaskOverdue(
        {
          dueDate: "2026-08-02",
          status: "TODO",
        },
        today,
      ),
    ).toBe(true);

    expect(
      isTaskOverdue(
        {
          dueDate: "2026-08-03",
          status: "IN_PROGRESS",
        },
        today,
      ),
    ).toBe(false);

    expect(
      isTaskOverdue(
        {
          dueDate: "2026-08-02",
          status: "COMPLETE",
        },
        today,
      ),
    ).toBe(false);
  });
});