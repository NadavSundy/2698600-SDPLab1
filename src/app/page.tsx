import Link from "next/link";

import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { TaskSort } from "@/components/TaskSort";
import { getActiveTasks } from "@/lib/taskRepository";
import {
  TASK_SORT_OPTIONS,
  type TaskSortOption,
} from "@/lib/taskTypes";

type HomePageProps = {
  searchParams: Promise<{
    sort?: string | string[];
  }>;
};

function isTaskSortOption(
  value: string | undefined,
): value is TaskSortOption {
  return (
    value !== undefined &&
    TASK_SORT_OPTIONS.includes(value as TaskSortOption)
  );
}

export default async function Home({
  searchParams,
}: HomePageProps) {
  const { sort } = await searchParams;

  const requestedSort = Array.isArray(sort)
    ? sort[0]
    : sort;

  const selectedSort: TaskSortOption =
    isTaskSortOption(requestedSort)
      ? requestedSort
      : "created";

  const tasks = getActiveTasks(selectedSort);

  return (
    <main>
      <h1>Todo Application</h1>

      <p>
        <Link href="/archived">
          View archived tasks
        </Link>
      </p>

      <TaskForm />

      <TaskSort selectedSort={selectedSort} />

      <TaskList tasks={tasks} />
    </main>
  );
}