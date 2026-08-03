import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { getActiveTasks } from "@/lib/taskRepository";

export default function Home() {
  const tasks = getActiveTasks();

  return (
    <main>
      <h1>Todo Application</h1>

      <TaskForm />

      <TaskList tasks={tasks} />
    </main>
  );
}