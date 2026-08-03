# Database Design

The application stores its data in a local SQLite database.

The database contains one table named `tasks`.

## Tasks Table

| Column | Type | Constraints | Purpose |
|---|---|---|---|
| `id` | INTEGER | Primary key, auto-incrementing | Uniquely identifies a task |
| `title` | TEXT | Required and cannot be blank | Stores the task title |
| `description` | TEXT | Required, defaults to an empty string | Stores optional descriptive information |
| `due_date` | TEXT | Required | Stores the due date in ISO `YYYY-MM-DD` format |
| `topic` | TEXT | Required and cannot be blank | Stores the topic used to categorise and sort tasks |
| `status` | TEXT | Required, restricted to `TODO`, `IN_PROGRESS`, or `COMPLETE` | Stores the task's current status |
| `archived_at` | TEXT | Nullable | Stores the archive timestamp; `NULL` means the task is active |
| `created_at` | TEXT | Required, defaults to the current timestamp | Records when the task was created |
| `updated_at` | TEXT | Required, defaults to the current timestamp | Records when the task was last updated |

## Relationships

There is only one table, so there are no foreign-key relationships.

This matches the single-user requirements of the application. The application does not need user accounts, shared task ownership, or predefined topic records.

## Archive Design

Tasks are never deleted.

Archiving updates the existing task row by setting `archived_at` to a timestamp. Active tasks have an `archived_at` value of `NULL`.

This allows archived tasks to remain viewable without copying them into a separate table.

## Overdue Design

Overdue is not stored in the database and is not one of the selectable task statuses.

A task is derived as overdue when:

- Its due date is earlier than the current date.
- Its status is not `COMPLETE`.

This avoids storing a value that can become outdated as time passes.

## Status Design

The database restricts status to three fixed values:

- `TODO`
- `IN_PROGRESS`
- `COMPLETE`

The application displays these as Todo, In-Progress, and Complete.

## AI Declaration

The preceding document was planned, reviewed and edited with the assistance of ChatGPT-Web[GPT-5.6 Thinking].