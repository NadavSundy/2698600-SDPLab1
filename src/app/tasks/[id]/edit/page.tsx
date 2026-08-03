import Link from "next/link";
import { notFound } from "next/navigation";

import { updateTaskAction } from "@/app/actions";
import { getTaskById } from "@/lib/taskRepository";

type EditTaskPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTaskPage({
  params,
}: EditTaskPageProps) {
  const { id } = await params;
  const taskId = Number(id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    notFound();
  }

  const task = getTaskById(taskId);

  if (!task) {
    notFound();
  }

  return (
    <main>
      <h1>Edit task</h1>

      <form action={updateTaskAction}>
        <input type="hidden" name="id" value={task.id} />

        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={task.title}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={task.description}
          />
        </div>

        <div>
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            defaultValue={task.dueDate}
            required
          />
        </div>

        <div>
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            name="topic"
            type="text"
            defaultValue={task.topic}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            defaultValue={task.status}
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In-Progress</option>
            <option value="COMPLETE">Complete</option>
          </select>
        </div>

        <button type="submit">Save changes</button>
      </form>

      <Link href="/">Back to tasks</Link>
    </main>
  );
}