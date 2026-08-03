import Link from "next/link";

import { archiveTaskAction } from "@/app/actions";
import { isTaskOverdue } from "@/lib/taskRules";
import type { Task } from "@/lib/taskTypes";

type TaskListProps = {
  tasks: Task[];
};

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

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No active tasks yet.</p>;
  }

  return (
    <section>
      <h2>Active tasks</h2>

      <ul>
        {tasks.map((task) => {
          const overdue = isTaskOverdue(task);

          return (
            <li
              key={task.id}
              className={overdue ? "task-overdue" : undefined}
            >
              <div className="task-heading">
                <h3>{task.title}</h3>

                {overdue && (
                  <span className="overdue-label">
                    Overdue
                  </span>
                )}
              </div>

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

              <div className="task-actions">
                <Link href={`/tasks/${task.id}/edit`}>
                  Edit task
                </Link>

                <form action={archiveTaskAction}>
                  <input
                    type="hidden"
                    name="id"
                    value={task.id}
                  />

                  <button type="submit">
                    Archive task
                  </button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}