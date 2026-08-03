type TaskSortProps = {
  selectedSort: string;
};

export function TaskSort({
  selectedSort,
}: TaskSortProps) {
  return (
    <form method="get" className="sort-form">
      <label htmlFor="sort">Sort tasks by</label>

      <select
        id="sort"
        name="sort"
        defaultValue={selectedSort}
      >
        <option value="created">Recently created</option>
        <option value="topic">Topic</option>
        <option value="status">Status</option>
        <option value="dueDate">Due date</option>
      </select>

      <button type="submit">Sort</button>
    </form>
  );
}