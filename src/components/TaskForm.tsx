import { createTaskAction } from "@/app/actions";

export function TaskForm() {
  return (
    <form className="task-form" action={createTaskAction}>
      <h2>Create a task</h2>

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="dueDate">Due date</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          required
        />
      </div>

      <div>
        <label htmlFor="topic">Topic</label>
        <input
          id="topic"
          name="topic"
          type="text"
          required
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          defaultValue="TODO"
        >
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In-Progress</option>
          <option value="COMPLETE">Complete</option>
        </select>
      </div>

      <button type="submit">Create task</button>
    </form>
  );
}