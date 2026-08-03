import { db } from "@/lib/db";

type TaskCountResult = {
  count: number;
};

export default function Home() {
  const result = db
    .prepare(
      `
        SELECT COUNT(*) AS count
        FROM tasks
        WHERE archived_at IS NULL
      `,
    )
    .get() as TaskCountResult;

  return (
    <main>
      <h1>Todo Application</h1>
      <p>Active tasks: {result.count}</p>
    </main>
  );
}