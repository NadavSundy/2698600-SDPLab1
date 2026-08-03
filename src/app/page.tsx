import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { getActiveTasks } from "@/lib/taskRepository";
import Link from "next/link";

export default function Home() {
  const tasks = getActiveTasks();

  return (
    <main>
      <h1>Todo Application</h1>
      <p>
  <Link href="/archived">View archived tasks</Link>
</p>

      <TaskForm />

      <TaskList tasks={tasks} />
    </main>
  );
}