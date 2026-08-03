import type { Task } from "@/lib/taskTypes";
import Link from "next/link";

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
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>

            <p>{task.description || "No description"}</p>
            <Link href={`/tasks/${task.id}/edit`}>
  Edit task
</Link>
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
          </li>
        ))}
      </ul>
    </section>
  );
}