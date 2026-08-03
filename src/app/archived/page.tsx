import Link from "next/link";

import { getArchivedTasks } from "@/lib/taskRepository";
import type { Task } from "@/lib/taskTypes";

function formatStatus(status: Task["status"]): string {
  switch (status) {
    case "TODO":
      return "Todo";
    case "IN_PROGRESS":
      return "In-Progress";
    case "COMPLETE":
      return "Complete";
  }
}

export default function ArchivedTasksPage() {
  const tasks = getArchivedTasks();

  return (
    <main>
      <h1>Archived tasks</h1>

      <p>
        <Link href="/">Back to active tasks</Link>
      </p>

      {tasks.length === 0 ? (
        <p>No archived tasks.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title}</h2>

              <p>{task.description || "No description"}</p>

              <dl>
                <div>
                  <dt>Topic</dt>
                  <dd>{task.topic}</dd>
                </div>

                <div>
                  <dt>Status</dt>
                  <dd>{formatStatus(task.status)}</dd>
                </div>

                <div>
                  <dt>Due date</dt>
                  <dd>{task.dueDate}</dd>
                </div>
              </dl>

              <p>Archived: {task.archivedAt}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}