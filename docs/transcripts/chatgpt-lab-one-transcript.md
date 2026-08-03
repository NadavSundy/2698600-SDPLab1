# Next.js SQLite Lab Guide

**User:** Anonymous  
**Created:** 8/3/2026 16:07:59  
**Updated:** 8/3/2026 23:34:01  
**Exported:** 8/3/2026 23:39:27  
**Link:** [https://chatgpt.com/g/g-p-6a70a019ceb881918a8223317e293330/c/6a70a0b6-1d9c-83ea-ae91-06997c70962d](https://chatgpt.com/g/g-p-6a70a019ceb881918a8223317e293330/c/6a70a0b6-1d9c-83ea-ae91-06997c70962d)  

## Prompt:
8/3/2026, 4:07:56 PM

Guide me through this lab

[Attachment: lab_one.pdf]

## Response:
8/3/2026, 4:07:58 PM

> **Planning the lab**
>
> I’m going to turn the brief into a practical build sequence: scaffold the app, model the data, add authentication and APIs, build the dashboard, then verify accessibility, tests, and documentation.
>
> **Planned the lab**
>
> 
>
> **Searching the web**
>
> [Testing: Vitest | Next.js](https://nextjs.org/docs/app/guides/testing/vitest)
> [better-sqlite3/docs/api.md at master · WiseLibs/better-sqlite3 · GitHub](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md)
> [Getting Started | Guide | Vitest](https://vitest.dev/guide/)
> [Vitest 4.1 is out! | Vitest](https://cn.vitest.dev/blog/vitest-4-1)
> [Getting Started | Guide | Vitest v1.6](https://v1.vitest.dev/guide/)
> [Getting Started | Guide | Vitest v0.34](https://v0.vitest.dev/guide/)
> [Advanced API | Vitest](https://main.vitest.dev/advanced/api/)
> [Getting Started | Guide | Vitest](https://v3.vitest.dev/guide/)
>
> **Building the lab plan**
>
> I’m breaking this into checkpoints: scaffold Next.js, choose SQLite persistence, add authentication, implement task CRUD, create the dashboard, then test accessibility, remediation, and AI-assisted workflow documentation. Start by sharing the current repository state and installed Node version.
>
> **Built the lab plan**
>
> 
>
> **Searching the web**
>
>
> **Searched 8 websites**
>
> 
>
> Worked for 1m 59s

We’ll build this **incrementally**, with you running and checking each stage rather than generating the whole application at once. This will produce a stronger commit history, useful AI transcripts, and evidence that you understood and corrected the work.

The lab is due **4 August 2026** and requires a local Next.js and SQLite todo application, at least three real tests, three areas of documentation, a meaningful commit history, and your AI transcripts. `lab_one.pdf`

## 1. What we are building

The finished application will have:

- An active-task page.
- An archived-task page.
- Create and edit forms.
- Three fixed statuses:
  - Todo
  - In-Progress
  - Complete
- Sorting by topic, status and due date.
- A visible overdue indicator.
- A persistent SQLite database.
- Tests using a temporary in-memory database.

The marking walkthrough is pass/fail for each function, so we will test every requirement in the same order the marker will. `lab_one.pdf`

## 2. Recommended architecture

Use this structure:

```text
todo-lab/
├── data/
│   └── todo.db                 # Generated locally; not committed
├── database/
│   └── schema.sql
├── docs/
│   ├── THIRD_PARTY_CODE.md
│   ├── DATABASE_DESIGN.md
│   └── AI_TRANSCRIPT.md
├── src/
│   ├── app/
│   │   ├── archived/
│   │   │   └── page.tsx
│   │   ├── actions.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── TaskForm.tsx
│   │   ├── TaskItem.tsx
│   │   └── TaskList.tsx
│   └── lib/
│       ├── database.ts
│       ├── taskRepository.ts
│       └── taskTypes.ts
├── tests/
│   └── taskRepository.test.ts
├── README.md
└── package.json
```

We’ll use the Next.js App Router and server actions. Current Next.js requires Node.js 20.9 or newer; Node 24 is currently an LTS release, so that is a sensible documented environment. ([Next.js](https://nextjs.org/docs/app/getting-started/installation?utm_source=chatgpt.com))

For the database, `better-sqlite3` is simple for this local-only application and supports both normal database files and `:memory:` databases, which will let the tests run without depending on your personal database. ([GitHub](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md?utm_source=chatgpt.com))

## 3. Database design

We should use one table:

```sql
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL
        CHECK (length(trim(title)) > 0),

    description TEXT NOT NULL DEFAULT '',

    due_date TEXT NOT NULL,

    topic TEXT NOT NULL
        CHECK (length(trim(topic)) > 0),

    status TEXT NOT NULL DEFAULT 'TODO'
        CHECK (status IN ('TODO', 'IN_PROGRESS', 'COMPLETE')),

    archived_at TEXT DEFAULT NULL,

    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Important design decisions:

- Dates are stored as ISO strings such as `2026-08-04`.
- Archived tasks stay in the same table.
- `archived_at IS NULL` means active.
- `archived_at IS NOT NULL` means archived.
- We never run a `DELETE` statement.
- Overdue is **not stored**.
- Overdue is calculated when displaying a task:

```ts
dueDate < today && status !== "COMPLETE"
```

- There is no users table because the brief specifies one local user.
- There is no separate topic table because topics only need to be stored and sorted; the brief does not require users to manage a predefined list of topics.

This directly addresses the database rubric: archive must be a flag or timestamp, overdue must be derived, and status must not include overdue. `lab_one.pdf`

## 4. Commit plan

Do not leave everything for one final commit. Use approximately these commits:

```text
chore: scaffold the local Next.js application

feat: add the SQLite task schema and database connection

feat: create tasks and display the active task list

feat: allow existing tasks to be edited

feat: archive tasks without deleting their records

feat: add task sorting and overdue indicators

test: cover task creation archiving sorting and overdue rules

docs: document dependencies database design and run commands

fix: verify application from a clean installation
```

Each commit should leave the repository working. The rubric requires at least six coherent commits and rewards work spread across more than one session. Do not fabricate history or alter timestamps. `lab_one.pdf`

## 5. AI-policy requirements

This assessment explicitly permits AI code generation, but you must declare it and remain responsible for everything submitted. You must also preserve the transcript. `ai_policy.pdf`

For commits containing AI-assisted code, use:

```powershell
git commit -m "feat: add SQLite task schema and database connection" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Your README should eventually contain:

```md
## AI Usage

This repository makes use of AI code generation using the following tools:
ChatGPT-Web[GPT-5.6 Thinking].

This repository does not use AI in-line editing tools.

This repository makes use of AI code review using the following tools:
ChatGPT-Web[GPT-5.6 Thinking].
```

Only state that you used code review if we actually review your code.

Each AI-assisted documentation file should include something like:

```md
AI Declaration: The preceding document was planned, reviewed and edited
with the assistance of ChatGPT-Web[GPT-5.6 Thinking].
```

Keep this conversation unedited for the required transcript. The AI rubric specifically rewards task-level use, clear constraints, and genuine cases where you identify an unsuitable result and redirect it. 

# Step 1: Create the project

Open PowerShell in the folder where you keep university projects.

First check Node:

```powershell
node --version
npm --version
```

You should ideally have Node 24 installed. Do not continue with a version below Node 20.9 because it does not meet the current Next.js requirement. ([Next.js](https://nextjs.org/docs/app/getting-started/installation?utm_source=chatgpt.com))

Create the application:

```powershell
npx create-next-app@latest todo-lab `
  --ts `
  --eslint `
  --app `
  --src-dir `
  --use-npm `
  --no-tailwind `
  --import-alias "@/*"
```

Then enter the folder and install the database and testing libraries:

```powershell
cd todo-lab

npm install better-sqlite3

npm install --save-dev @types/better-sqlite3 vitest
```

Next, check that the untouched application starts:

```powershell
npm run dev
```

Visit:

```text
http://localhost:3000
```

Stop it with `Ctrl+C`, then run:

```powershell
npm run lint
```

Create the first commit:

```powershell
git status
git add .
git commit -m "chore: scaffold the local Next.js application" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Next.js officially supports creating App Router projects through `create-next-app`, and Vitest is one of its documented testing options. ([Next.js](https://nextjs.org/docs/app/api-reference/cli/create-next-app?utm_source=chatgpt.com))

Run **Step 1** and send me the output of:

```powershell
node --version
npm run lint
git log --oneline -1
```

Then we’ll implement the SQLite schema and database connection as the second coherent commit.

---

**Sources:**

- [Getting Started: Installation | Next.js](https://nextjs.org/docs/app/getting-started/installation?utm_source=chatgpt.com)
- [better-sqlite3/docs/api.md at master · WiseLibs/better-sqlite3 · GitHub](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md?utm_source=chatgpt.com)

## Prompt:
8/3/2026, 4:17:25 PM

how do i add it to git?

## Response:
8/3/2026, 4:17:34 PM

From inside your project folder, run:

```powershell
cd path\to\todo-lab
git status
```

`create-next-app` often creates the Git repository automatically. If `git status` works, continue with:

```powershell
git add .
git commit -m "chore: scaffold the local Next.js application" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

The second line records the AI assistance in the format required by the course policy. `ai_policy.pdf`

## If Git says “not a git repository”

Run:

```powershell
git init
git add .
git commit -m "chore: scaffold the local Next.js application" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

If Git asks for your identity:

```powershell
git config --global user.name "Nadav Sundy"
git config --global user.email "your-github-email@example.com"
```

Then retry the commit.

## Add it to GitHub

1. Go to GitHub.
2. Select **New repository**.
3. Name it something like:

```text
coms3011a-lab-1
```

4. Do **not** add a README, `.gitignore`, or licence on GitHub, because your local project already has files.
5. Create the repository.

GitHub will show commands. They should look like:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/coms3011a-lab-1.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

Check that it worked:

```powershell
git remote -v
git log --oneline
```

Your repository must eventually be submitted as a GitHub link, and the marking rubric expects at least six meaningful commits rather than one bulk upload. `lab_one.pdf`

## Prompt:
8/3/2026, 4:19:40 PM

when i run it says Next.js logo
To get started, edit the page.tsx file.
Looking for a starting point or more instructions? Head over to Templates or the Learning center.

## Response:
8/3/2026, 4:19:47 PM

That means **the Next.js application is running correctly**. The screen you see is the default starter page created by `create-next-app`.

You have now completed the basic setup required for the first walkthrough item: the application installs and starts successfully. `lab_one.pdf`

## Save this progress to Git

Go back to PowerShell and stop the server with:

```powershell
Ctrl+C
```

Then run:

```powershell
git status
```

Add all the project files:

```powershell
git add .
```

Create your first commit:

```powershell
git commit -m "chore: scaffold the Next.js application" -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Check the commit:

```powershell
git log --oneline -1
```

You should see something similar to:

```text
a12bc34 chore: scaffold the Next.js application
```

If you already connected the repository to GitHub, push it:

```powershell
git push
```

If not, the commit is still safely stored locally.

## Next: install SQLite

Run:

```powershell
npm install better-sqlite3
npm install --save-dev @types/better-sqlite3 vitest
```

Then check that the project still works:

```powershell
npm run dev
```

When the same Next.js starter page appears, stop it again with `Ctrl+C`. We can then create the database schema as the second commit.

## Prompt:
8/3/2026, 4:22:00 PM

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> node --version
v24.11.0
PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> npm run lint

> todo-lab@0.1.0 lint
> eslint

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> git log --oneline -1
77fc4cd (HEAD -> master) chore: scaffold the local Next.js application
PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab>

## Response:
8/3/2026, 4:22:27 PM

> **Reviewing database setup**
>
> I’m checking the SQLite schema and initialization code for practical issues. The date validation may be overly strict or incomplete, while the database path, WAL mode, schema loading, and TypeScript typings appear reasonable.
>
> **Reviewed database setup**
>
> 
>
> Worked for 39s

Perfect - your setup is working:

- Node.js **v24.11.0**
- Lint passes with no errors
- Your first Git commit exists

That completes the project-scaffolding stage. The lab requires the application to install and start from a clean clone, so this is an important first milestone. `lab_one.pdf`

## Check the AI attribution on your commit

`git log --oneline` only shows the commit title. Run:

```powershell
git log -1 --pretty=full
```

You should see:

```text
Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]
```

The course policy requires AI-generated code to be attributed in the relevant commit. `ai_policy.pdf`

If it is missing and you have not pushed yet, run:

```powershell
git commit --amend `
  -m "chore: scaffold the local Next.js application" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

# Step 2: Add SQLite

## 1. Install the packages

Run:

```powershell
npm install better-sqlite3
npm install --save-dev @types/better-sqlite3 vitest
```

## 2. Create the folders

Run:

```powershell
mkdir database
mkdir data
mkdir src\lib
```

It is okay if PowerShell says `src\lib` already exists.

## 3. Prevent the database from being committed

Open `.gitignore` and add this at the bottom:

```gitignore
# Local SQLite database files
/data/*.db
/data/*.db-shm
/data/*.db-wal
```

The database file should be created locally, but it should not be uploaded to GitHub.

## 4. Create the schema

Create:

```text
database/schema.sql
```

Add:

```sql
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL
        CHECK (length(trim(title)) > 0),

    description TEXT NOT NULL DEFAULT '',

    due_date TEXT NOT NULL,

    topic TEXT NOT NULL
        CHECK (length(trim(topic)) > 0),

    status TEXT NOT NULL DEFAULT 'TODO'
        CHECK (status IN ('TODO', 'IN_PROGRESS', 'COMPLETE')),

    archived_at TEXT DEFAULT NULL,

    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

This design follows the marking requirements:

- Tasks remain in the database when archived.
- Archive is represented by `archived_at`.
- Overdue is not stored as a status.
- Status is restricted to the three permitted values. `lab_one.pdf`

## 5. Create the database connection

Create:

```text
src/lib/db.ts
```

Add:

```ts
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const databaseDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(databaseDirectory, "todo.db");
const schemaPath = path.join(process.cwd(), "database", "schema.sql");

function createDatabase(): Database.Database {
  fs.mkdirSync(databaseDirectory, { recursive: true });

  const database = new Database(databasePath);
  const schema = fs.readFileSync(schemaPath, "utf8");

  database.pragma("journal_mode = WAL");
  database.exec(schema);

  return database;
}

const globalForDatabase = globalThis as unknown as {
  todoDatabase?: Database.Database;
};

export const db =
  globalForDatabase.todoDatabase ?? createDatabase();

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.todoDatabase = db;
}
```

The `globalThis` section prevents Next.js development reloads from repeatedly opening new database connections.

## 6. Replace the starter page

Open:

```text
src/app/page.tsx
```

Replace everything with:

```tsx
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
```

This is a server component, so the SQLite database is accessed by Node.js rather than from the browser.

## 7. Test it

Run:

```powershell
npm run lint
npm run dev
```

Open:

```text
http://localhost:3000
```

You should see:

```text
Todo Application
Active tasks: 0
```

A new file should also appear at:

```text
data/todo.db
```

Stop the server using `Ctrl+C`.

Then run:

```powershell
git status
```

The database file itself should **not** appear in the files waiting to be committed.

## 8. Make the second commit

```powershell
git add .
git commit `
  -m "feat: add SQLite schema and database connection" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Verify both commits:

```powershell
git log --oneline
```

You should now have something similar to:

```text
abc1234 feat: add SQLite schema and database connection
77fc4cd chore: scaffold the local Next.js application
```

## Prompt:
8/3/2026, 4:23:28 PM

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> git log --oneline -1
77fc4cd (HEAD -> master) chore: scaffold the local Next.js application
PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> git commit --amend `
>>   -m "chore: scaffold the local Next.js application" `
>>   -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
[master c0d0844] chore: scaffold the local Next.js application
 Date: Mon Aug 3 16:20:49 2026 +0200
 2 files changed, 1186 insertions(+), 81 deletions(-)
PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> git log --oneline -1
c0d0844 (HEAD -> master) chore: scaffold the local Next.js application
PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> git log --oneline
c0d0844 (HEAD -> master) chore: scaffold the local Next.js application
6c7539b Initial commit from Create Next App
PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab>

## Response:
8/3/2026, 4:23:38 PM

That worked correctly. Amending the commit created a new hash (`c0d0844`) and added the required AI attribution.

You currently have two commits:

```text
c0d0844 chore: scaffold the local Next.js application
6c7539b Initial commit from Create Next App
```

The automatic `Initial commit from Create Next App` is normal. It can count toward your history, although you should still make at least six clear, meaningful commits of your own because commit history is worth 18 marks. `lab_one.pdf`

Confirm the attribution is present with:

```powershell
git log -1 --pretty=full
```

You should see:

```text
Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]
```

That matches the course requirement for AI-assisted code commits. `ai_policy.pdf`

You can now continue with the SQLite step:

```powershell
npm install better-sqlite3
npm install --save-dev @types/better-sqlite3 vitest
```

## Prompt:
8/3/2026, 4:28:06 PM

help me continue

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> git commit `
>>   -m "feat: add SQLite schema and database connection" `
>>   -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
[master 0a5c41f] feat: add SQLite schema and database connection
 4 files changed, 77 insertions(+), 62 deletions(-)
 create mode 100644 database/schema.sql
 create mode 100644 src/lib/db.ts
PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> git log --oneline
0a5c41f (HEAD -> master) feat: add SQLite schema and database connection
c0d0844 chore: scaffold the local Next.js application
6c7539b Initial commit from Create Next App
PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab>

## Response:
8/3/2026, 4:28:12 PM

Great - your SQLite layer is committed and your history is developing properly.

Next we will add the first real behaviour: **creating a task and displaying active tasks**. This directly covers the walkthrough requirement that a task can be created with all four fields and then appears in the list. `lab_one.pdf`

# Step 3: Create and display tasks

## 1. Create the task types

Create:

```text
src/lib/taskTypes.ts
```

Add:

```ts
export const TASK_STATUSES = [
  "TODO",
  "IN_PROGRESS",
  "COMPLETE",
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  topic: string;
  status: TaskStatus;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description: string;
  dueDate: string;
  topic: string;
  status: TaskStatus;
};
```

## 2. Create the task repository

Create:

```text
src/lib/taskRepository.ts
```

Add:

```ts
import type Database from "better-sqlite3";

import { db } from "@/lib/db";
import type {
  CreateTaskInput,
  Task,
  TaskStatus,
} from "@/lib/taskTypes";

type TaskRow = {
  id: number;
  title: string;
  description: string;
  due_date: string;
  topic: string;
  status: TaskStatus;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
};

function mapTaskRow(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    dueDate: row.due_date,
    topic: row.topic,
    status: row.status,
    archivedAt: row.archived_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createTask(
  input: CreateTaskInput,
  database: Database.Database = db,
): Task {
  const statement = database.prepare(`
    INSERT INTO tasks (
      title,
      description,
      due_date,
      topic,
      status
    )
    VALUES (
      @title,
      @description,
      @dueDate,
      @topic,
      @status
    )
  `);

  const result = statement.run({
    title: input.title.trim(),
    description: input.description.trim(),
    dueDate: input.dueDate,
    topic: input.topic.trim(),
    status: input.status,
  });

  const row = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE id = ?
      `,
    )
    .get(result.lastInsertRowid) as TaskRow;

  return mapTaskRow(row);
}

export function getActiveTasks(
  database: Database.Database = db,
): Task[] {
  const rows = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE archived_at IS NULL
        ORDER BY created_at DESC, id DESC
      `,
    )
    .all() as TaskRow[];

  return rows.map(mapTaskRow);
}
```

This repository separates database behaviour from the page. That will make later testing much easier.

## 3. Create the server action

Create:

```text
src/app/actions.ts
```

Add:

```ts
"use server";

import { revalidatePath } from "next/cache";

import { createTask } from "@/lib/taskRepository";
import {
  TASK_STATUSES,
  type TaskStatus,
} from "@/lib/taskTypes";

function isTaskStatus(value: string): value is TaskStatus {
  return TASK_STATUSES.includes(value as TaskStatus);
}

export async function createTaskAction(
  formData: FormData,
): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(
    formData.get("description") ?? "",
  ).trim();
  const dueDate = String(formData.get("dueDate") ?? "");
  const topic = String(formData.get("topic") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "TODO");

  if (!title) {
    throw new Error("A task title is required.");
  }

  if (!topic) {
    throw new Error("A task topic is required.");
  }

  if (!dueDate) {
    throw new Error("A due date is required.");
  }

  if (!isTaskStatus(statusValue)) {
    throw new Error("Invalid task status.");
  }

  createTask({
    title,
    description,
    dueDate,
    topic,
    status: statusValue,
  });

  revalidatePath("/");
}
```

This keeps the validation on the server, even though the form will also use browser validation.

## 4. Create the task form

Create the folder:

```powershell
mkdir src\components
```

Create:

```text
src/components/TaskForm.tsx
```

Add:

```tsx
import { createTaskAction } from "@/app/actions";

export function TaskForm() {
  return (
    <form action={createTaskAction}>
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
```

## 5. Create the task list

Create:

```text
src/components/TaskList.tsx
```

Add:

```tsx
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
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>

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
          </li>
        ))}
      </ul>
    </section>
  );
}
```

## 6. Replace the home page

Open:

```text
src/app/page.tsx
```

Replace it with:

```tsx
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
```

## 7. Add basic styling

Open:

```text
src/app/globals.css
```

Replace it with:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f4f4f4;
  color: #1f1f1f;
  font-family: Arial, Helvetica, sans-serif;
}

main {
  width: min(900px, calc(100% - 32px));
  margin: 40px auto;
}

form,
li {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  background: white;
}

form div {
  margin-bottom: 16px;
}

label,
dt {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 4px;
  font: inherit;
}

button {
  padding: 10px 16px;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  font: inherit;
}

ul {
  padding: 0;
  list-style: none;
}

dl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

dd {
  margin: 0;
}
```

## 8. Run and test it

Run:

```powershell
npm run lint
npm run dev
```

Open:

```text
http://localhost:3000
```

Create a test task using all four required fields:

```text
Title: Finish Lab 1
Description: Complete the todo application
Due date: 2026-08-04
Topic: COMS3011A
Status: Todo
```

After submitting, it should appear under **Active tasks**.

Reload the page. The task should still be present because it is stored in SQLite.

Stop the server with:

```text
Ctrl+C
```

## 9. Inspect what will be committed

Run:

```powershell
git status
```

Make sure `data/todo.db` is not shown.

Then commit:

```powershell
git add .

git commit `
  -m "feat: create tasks and display the active task list" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Check the history:

```powershell
git log --oneline
```

After this, the next commit will add **editing existing tasks**, including making sure edits survive a page reload.

## Prompt:
8/3/2026, 8:24:54 PM

let continue

## Response:
8/3/2026, 8:24:56 PM

Next we’ll add **editing existing tasks** so that changes survive a reload. That is the third item in the functional walkthrough. `lab_one.pdf`

# Step 4: Edit tasks

## 1. Add an update input type

Open:

```text
src/lib/taskTypes.ts
```

Add this below `CreateTaskInput`:

```ts
export type UpdateTaskInput = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  topic: string;
  status: TaskStatus;
};
```

Your file should now end with:

```ts
export type CreateTaskInput = {
  title: string;
  description: string;
  dueDate: string;
  topic: string;
  status: TaskStatus;
};

export type UpdateTaskInput = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  topic: string;
  status: TaskStatus;
};
```

## 2. Add repository functions

Open:

```text
src/lib/taskRepository.ts
```

Update the import to include `UpdateTaskInput`:

```ts
import type {
  CreateTaskInput,
  Task,
  TaskStatus,
  UpdateTaskInput,
} from "@/lib/taskTypes";
```

Then add these functions at the bottom:

```ts
export function getTaskById(
  id: number,
  database: Database.Database = db,
): Task | null {
  const row = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE id = ?
      `,
    )
    .get(id) as TaskRow | undefined;

  return row ? mapTaskRow(row) : null;
}

export function updateTask(
  input: UpdateTaskInput,
  database: Database.Database = db,
): Task {
  const result = database
    .prepare(
      `
        UPDATE tasks
        SET
          title = @title,
          description = @description,
          due_date = @dueDate,
          topic = @topic,
          status = @status,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = @id
      `,
    )
    .run({
      id: input.id,
      title: input.title.trim(),
      description: input.description.trim(),
      dueDate: input.dueDate,
      topic: input.topic.trim(),
      status: input.status,
    });

  if (result.changes === 0) {
    throw new Error("Task not found.");
  }

  const updatedTask = getTaskById(input.id, database);

  if (!updatedTask) {
    throw new Error("Updated task could not be loaded.");
  }

  return updatedTask;
}
```

## 3. Add the update server action

Open:

```text
src/app/actions.ts
```

Update the repository import:

```ts
import {
  createTask,
  updateTask,
} from "@/lib/taskRepository";
```

Then add this action below `createTaskAction`:

```ts
export async function updateTaskAction(
  formData: FormData,
): Promise<void> {
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const description = String(
    formData.get("description") ?? "",
  ).trim();
  const dueDate = String(formData.get("dueDate") ?? "");
  const topic = String(formData.get("topic") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "TODO");

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid task ID.");
  }

  if (!title) {
    throw new Error("A task title is required.");
  }

  if (!topic) {
    throw new Error("A task topic is required.");
  }

  if (!dueDate) {
    throw new Error("A due date is required.");
  }

  if (!isTaskStatus(statusValue)) {
    throw new Error("Invalid task status.");
  }

  updateTask({
    id,
    title,
    description,
    dueDate,
    topic,
    status: statusValue,
  });

  revalidatePath("/");
}
```

## 4. Create an edit page

Create this folder structure:

```powershell
mkdir src\app\tasks
mkdir src\app\tasks\[id]
mkdir src\app\tasks\[id]\edit
```

PowerShell may interpret square brackets oddly in some cases. If that happens, create the folders manually in VS Code.

Create:

```text
src/app/tasks/[id]/edit/page.tsx
```

Add:

```tsx
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
```

## 5. Redirect after editing

At the moment, the update action saves the task but leaves you on the edit page.

Open:

```text
src/app/actions.ts
```

Add this import:

```ts
import { redirect } from "next/navigation";
```

Then change the end of `updateTaskAction` from:

```ts
revalidatePath("/");
```

to:

```ts
revalidatePath("/");
redirect("/");
```

Do not add `redirect("/")` to `createTaskAction` because creation already happens on the home page.

## 6. Add an Edit link to each task

Open:

```text
src/components/TaskList.tsx
```

Add this import at the top:

```ts
import Link from "next/link";
```

Then, inside each task’s `<li>`, add this beneath the `<dl>`:

```tsx
<Link href={`/tasks/${task.id}/edit`}>
  Edit task
</Link>
```

The full lower portion should look like:

```tsx
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

<Link href={`/tasks/${task.id}/edit`}>
  Edit task
</Link>
```

## 7. Test editing

Run:

```powershell
npm run lint
npm run dev
```

Open:

```text
http://localhost:3000
```

Test this sequence:

1. Click **Edit task**.
2. Change the title.
3. Change the topic or status.
4. Click **Save changes**.
5. Confirm you return to the home page.
6. Confirm the new values appear.
7. Reload the page.
8. Confirm the changes remain.

That verifies the edit is persisted in SQLite rather than only changed in browser state.

## 8. Commit the change

Stop the server with `Ctrl+C`, then run:

```powershell
git status
git add .
git commit `
  -m "feat: allow existing tasks to be edited" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Then check:

```powershell
git log --oneline
```

The course policy requires AI-assisted code generation to be declared in the relevant commit, so keep using the `Assisted-by` line for these commits. `ai_policy.pdf`

After this commit, the next stage is **archiving tasks without deleting them**, including an archived-task view.

## Prompt:
8/3/2026, 8:33:56 PM

he name `createTask` is defined multiple times
./src/app/actions.ts (8:3)

the name `createTask` is defined multiple times
   6 | import { redirect } from "next/navigation";
   7 | import {
>  8 |   createTask,
     |   ^^^^^^^^^^
   9 |   updateTask,
  10 | } from "@/lib/taskRepository";
  11 |

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/app/actions.ts
    ./src/components/TaskForm.tsx
    ./src/app/page.tsx

## Response:
8/3/2026, 8:34:02 PM

This means `actions.ts` already has another identifier called `createTask`, most likely an action function or an older import.

The cleanest fix is to rename the repository import.

Open:

```text
src/app/actions.ts
```

Change:

```ts
import {
  createTask,
  updateTask,
} from "@/lib/taskRepository";
```

to:

```ts
import {
  createTask as insertTask,
  updateTask as saveTaskChanges,
} from "@/lib/taskRepository";
```

Then, inside `createTaskAction`, change:

```ts
createTask({
  title,
  description,
  dueDate,
  topic,
  status: statusValue,
});
```

to:

```ts
insertTask({
  title,
  description,
  dueDate,
  topic,
  status: statusValue,
});
```

Inside `updateTaskAction`, change:

```ts
updateTask({
  id,
  title,
  description,
  dueDate,
  topic,
  status: statusValue,
});
```

to:

```ts
saveTaskChanges({
  id,
  title,
  description,
  dueDate,
  topic,
  status: statusValue,
});
```

The top of `actions.ts` should now look approximately like this:

```ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createTask as insertTask,
  updateTask as saveTaskChanges,
} from "@/lib/taskRepository";

import {
  TASK_STATUSES,
  type TaskStatus,
} from "@/lib/taskTypes";
```

Then run:

```powershell
npm run lint
npm run dev
```

Also search `actions.ts` for any duplicate import such as:

```ts
import { createTask } from "@/lib/taskRepository";
```

Delete the older duplicate if it still exists. Do not commit until the edit flow works and lint passes.

## Prompt:
8/3/2026, 8:37:02 PM

when i try and save

Runtime ReferenceError
Server



TASK_STATUSES is not defined
src\app\actions.ts (13:3) @ isTaskStatus


  11 |
  12 | function isTaskStatus(value: string): value is TaskStatus {
> 13 |   return TASK_STATUSES.includes(value as TaskStatus);
     |   ^
  14 | }
  15 |
  16 | export async function createTaskAction(
Call Stack
9

isTaskStatus
src\app\actions.ts (13:3)
updateTaskAction
src\app\actions.ts (82:8)
resolveErrorDev
file:///C:/Users/nsund/Documents/SDP%20Labs/Lab%201/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js (1919:105)
processFullStringRow
file:///C:/Users/nsund/Documents/SDP%20Labs/Lab%201/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js (2434:29)
processFullBinaryRow
file:///C:/Users/nsund/Documents/SDP%20Labs/Lab%201/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js (2393:9)
processBinaryChunk
file:///C:/Users/nsund/Documents/SDP%20Labs/Lab%201/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js (2502:221)
progress
file:///C:/Users/nsund/Documents/SDP%20Labs/Lab%201/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js (2689:13)
form
<anonymous>
EditTaskPage
src\app\tasks\[id]\edit\page.tsx (33:7)

"use server";

import { revalidatePath } from "next/cache";

import { createTask } from "@/lib/taskRepository";
import { redirect } from "next/navigation";
import {
  createTask as insertTask,
  updateTask as saveTaskChanges,
} from "@/lib/taskRepository";

function isTaskStatus(value: string): value is TaskStatus {
  return TASK_STATUSES.includes(value as TaskStatus);
}

export async function createTaskAction(
  formData: FormData,
): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(
    formData.get("description") ?? "",
  ).trim();
  const dueDate = String(formData.get("dueDate") ?? "");
  const topic = String(formData.get("topic") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "TODO");

  if (!title) {
    throw new Error("A task title is required.");
  }

  if (!topic) {
    throw new Error("A task topic is required.");
  }

  if (!dueDate) {
    throw new Error("A due date is required.");
  }

  if (!isTaskStatus(statusValue)) {
    throw new Error("Invalid task status.");
  }

  insertTask({
  title,
  description,
  dueDate,
  topic,
  status: statusValue,
});

  revalidatePath("/");
}

export async function updateTaskAction(
  formData: FormData,
): Promise<void> {
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const description = String(
    formData.get("description") ?? "",
  ).trim();
  const dueDate = String(formData.get("dueDate") ?? "");
  const topic = String(formData.get("topic") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "TODO");

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid task ID.");
  }

  if (!title) {
    throw new Error("A task title is required.");
  }

  if (!topic) {
    throw new Error("A task topic is required.");
  }

  if (!dueDate) {
    throw new Error("A due date is required.");
  }

  if (!isTaskStatus(statusValue)) {
    throw new Error("Invalid task status.");
  }

  saveTaskChanges({
  id,
  title,
  description,
  dueDate,
  topic,
  status: statusValue,
});

 revalidatePath("/");
redirect("/");
}

## Response:
8/3/2026, 8:37:04 PM

You have two issues in `actions.ts`:

1. `TASK_STATUSES` and `TaskStatus` are no longer imported.
2. You still have an old duplicate `createTask` import.

Replace the entire contents of `src/app/actions.ts` with this:

```ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createTask as insertTask,
  updateTask as saveTaskChanges,
} from "@/lib/taskRepository";

import {
  TASK_STATUSES,
  type TaskStatus,
} from "@/lib/taskTypes";

function isTaskStatus(value: string): value is TaskStatus {
  return TASK_STATUSES.includes(value as TaskStatus);
}

export async function createTaskAction(
  formData: FormData,
): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(
    formData.get("description") ?? "",
  ).trim();
  const dueDate = String(formData.get("dueDate") ?? "");
  const topic = String(formData.get("topic") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "TODO");

  if (!title) {
    throw new Error("A task title is required.");
  }

  if (!topic) {
    throw new Error("A task topic is required.");
  }

  if (!dueDate) {
    throw new Error("A due date is required.");
  }

  if (!isTaskStatus(statusValue)) {
    throw new Error("Invalid task status.");
  }

  insertTask({
    title,
    description,
    dueDate,
    topic,
    status: statusValue,
  });

  revalidatePath("/");
}

export async function updateTaskAction(
  formData: FormData,
): Promise<void> {
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const description = String(
    formData.get("description") ?? "",
  ).trim();
  const dueDate = String(formData.get("dueDate") ?? "");
  const topic = String(formData.get("topic") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "TODO");

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid task ID.");
  }

  if (!title) {
    throw new Error("A task title is required.");
  }

  if (!topic) {
    throw new Error("A task topic is required.");
  }

  if (!dueDate) {
    throw new Error("A due date is required.");
  }

  if (!isTaskStatus(statusValue)) {
    throw new Error("Invalid task status.");
  }

  saveTaskChanges({
    id,
    title,
    description,
    dueDate,
    topic,
    status: statusValue,
  });

  revalidatePath("/");
  redirect("/");
}
```

The line to remove was:

```ts
import { createTask } from "@/lib/taskRepository";
```

Then restart the development server, because Next.js may still have the failed server module cached:

```powershell
Ctrl+C
npm run lint
npm run dev
```

Try editing and saving again. The edit should now save, redirect to `/`, and survive a page refresh. Do not commit until `npm run lint` passes and you have verified the edited values persist.

## Prompt:
8/3/2026, 8:39:00 PM

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> git log --oneline
810b313 (HEAD -> master) feat: allow existing tasks to be edited
e67c770 feat: create tasks and display the active task list
0a5c41f feat: add SQLite schema and database connection
c0d0844 chore: scaffold the local Next.js application
6c7539b Initial commit from Create Next App

lets continue

## Response:
8/3/2026, 8:39:02 PM

Your repository now has five commits, with four clear feature commits of your own. Next we’ll implement **archiving without deletion** and add a page where archived tasks remain viewable. This covers walkthrough item 4 and the database-design requirement that archived tasks stay in the same table. `lab_one.pdf`

# Step 5: Archive tasks

## 1. Add repository functions

Open:

```text
src/lib/taskRepository.ts
```

Add these functions at the bottom:

```ts
export function archiveTask(
  id: number,
  database: Database.Database = db,
): Task {
  const result = database
    .prepare(
      `
        UPDATE tasks
        SET
          archived_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
          AND archived_at IS NULL
      `,
    )
    .run(id);

  if (result.changes === 0) {
    throw new Error("Active task not found.");
  }

  const archivedTask = getTaskById(id, database);

  if (!archivedTask) {
    throw new Error("Archived task could not be loaded.");
  }

  return archivedTask;
}

export function getArchivedTasks(
  database: Database.Database = db,
): Task[] {
  const rows = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE archived_at IS NOT NULL
        ORDER BY archived_at DESC, id DESC
      `,
    )
    .all() as TaskRow[];

  return rows.map(mapTaskRow);
}
```

This updates the existing row instead of deleting or copying it.

---

## 2. Add the archive server action

Open:

```text
src/app/actions.ts
```

Update the repository import from:

```ts
import {
  createTask as insertTask,
  updateTask as saveTaskChanges,
} from "@/lib/taskRepository";
```

to:

```ts
import {
  archiveTask,
  createTask as insertTask,
  updateTask as saveTaskChanges,
} from "@/lib/taskRepository";
```

Then add this function at the bottom of the file:

```ts
export async function archiveTaskAction(
  formData: FormData,
): Promise<void> {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid task ID.");
  }

  archiveTask(id);

  revalidatePath("/");
  revalidatePath("/archived");
}
```

---

## 3. Add an archive button

Open:

```text
src/components/TaskList.tsx
```

Add this import:

```ts
import { archiveTaskAction } from "@/app/actions";
```

Inside each task `<li>`, below the edit link, add:

```tsx
<form action={archiveTaskAction}>
  <input type="hidden" name="id" value={task.id} />
  <button type="submit">Archive task</button>
</form>
```

Your lower section should look like:

```tsx
<Link href={`/tasks/${task.id}/edit`}>
  Edit task
</Link>

<form action={archiveTaskAction}>
  <input type="hidden" name="id" value={task.id} />
  <button type="submit">Archive task</button>
</form>
```

There is one styling issue: your CSS styles every `form` as a large white card. That would make the small archive form look wrong.

Open:

```text
src/app/globals.css
```

Find:

```css
form,
li {
```

Change it to:

```css
.task-form,
li {
```

Then add the class to the create form.

Open:

```text
src/components/TaskForm.tsx
```

Change:

```tsx
<form action={createTaskAction}>
```

to:

```tsx
<form className="task-form" action={createTaskAction}>
```

Open:

```text
src/app/tasks/[id]/edit/page.tsx
```

Change:

```tsx
<form action={updateTaskAction}>
```

to:

```tsx
<form className="task-form" action={updateTaskAction}>
```

Add a small style for the archive form:

```css
.task-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
}

.task-actions form {
  margin: 0;
  padding: 0;
}
```

Then wrap the edit link and archive form in `TaskList.tsx`:

```tsx
<div className="task-actions">
  <Link href={`/tasks/${task.id}/edit`}>
    Edit task
  </Link>

  <form action={archiveTaskAction}>
    <input type="hidden" name="id" value={task.id} />
    <button type="submit">Archive task</button>
  </form>
</div>
```

---

## 4. Create the archived-tasks page

Create:

```text
src/app/archived/page.tsx
```

Add:

```tsx
import Link from "next/link";

import { getArchivedTasks } from "@/lib/taskRepository";

function formatStatus(
  status: "TODO" | "IN_PROGRESS" | "COMPLETE",
): string {
  switch (status) {
    case "TODO":
      return "Todo";
    case "IN_PROGRESS":
      return "In-Progress";
    case "COMPLETE":
      return "Complete";
  }
}

export default function ArchivedTasksPage() {
  const tasks = getArchivedTasks();

  return (
    <main>
      <h1>Archived tasks</h1>

      <p>
        <Link href="/">Back to active tasks</Link>
      </p>

      {tasks.length === 0 ? (
        <p>No archived tasks.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title}</h2>

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

              <p>
                Archived: {task.archivedAt}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

---

## 5. Link to the archived page

Open:

```text
src/app/page.tsx
```

Add:

```ts
import Link from "next/link";
```

Then below the main heading add:

```tsx
<p>
  <Link href="/archived">View archived tasks</Link>
</p>
```

The page should look approximately like:

```tsx
import Link from "next/link";

import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { getActiveTasks } from "@/lib/taskRepository";

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
```

---

## 6. Test the full archive behaviour

Run:

```powershell
npm run lint
npm run dev
```

Test this sequence:

1. Create a task if none exists.
2. Click **Archive task**.
3. Confirm it disappears from the active list.
4. Click **View archived tasks**.
5. Confirm the same task appears there.
6. Stop the server.
7. Start it again.
8. Confirm the task is still archived and viewable.

This confirms that the task was not deleted and that the archive state persists in SQLite. `lab_one.pdf`

---

## 7. Commit the archive feature

After lint passes and the behaviour works:

```powershell
git status
git add .

git commit `
  -m "feat: archive tasks without deleting their records" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Then verify:

```powershell
git log --oneline
```

You will then have at least six commits overall, although we should still add separate commits for sorting, overdue behaviour, tests and documentation. The AI attribution line remains required for AI-assisted code commits. `ai_policy.pdf`

## Prompt:
8/3/2026, 8:42:56 PM

give me the full tasks/[id]/edit/pahe.tsx

## Response:
8/3/2026, 8:43:08 PM

```tsx
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

      <form className="task-form" action={updateTaskAction}>
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

      <p>
        <Link href="/">Back to tasks</Link>
      </p>
    </main>
  );
}
```

## Prompt:
8/3/2026, 8:44:32 PM

I get a 404 when saying view archive task if none exist

## Response:
8/3/2026, 8:44:34 PM

A 404 means Next.js cannot find the `/archived` route. It is unrelated to whether archived tasks exist.

Most likely, the folder was not created correctly.

Make sure this exact file exists:

```text
src/app/archived/page.tsx
```

Your structure should be:

```text
src
└── app
    ├── archived
    │   └── page.tsx
    ├── page.tsx
    └── actions.ts
```

Use this full `src/app/archived/page.tsx`:

```tsx
import Link from "next/link";

import { getArchivedTasks } from "@/lib/taskRepository";

function formatStatus(
  status: "TODO" | "IN_PROGRESS" | "COMPLETE",
): string {
  switch (status) {
    case "TODO":
      return "Todo";
    case "IN_PROGRESS":
      return "In-Progress";
    case "COMPLETE":
      return "Complete";
  }
}

export default function ArchivedTasksPage() {
  const tasks = getArchivedTasks();

  return (
    <main>
      <h1>Archived tasks</h1>

      <p>
        <Link href="/">Back to active tasks</Link>
      </p>

      {tasks.length === 0 ? (
        <p>No archived tasks.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title}</h2>

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

              <p>Archived: {task.archivedAt}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

Then stop and restart Next.js:

```powershell
Ctrl+C
npm run dev
```

Open this directly:

```text
http://localhost:3000/archived
```

Also check the folder exists from PowerShell:

```powershell
Get-ChildItem src\app\archived
```

You should see:

```text
page.tsx
```

If PowerShell says the folder does not exist, create it with:

```powershell
New-Item -ItemType Directory -Path "src\app\archived"
New-Item -ItemType File -Path "src\app\archived\page.tsx"
```

Then paste the code above into that file.

When there are no archived tasks, the page should display:

```text
Archived tasks
Back to active tasks
No archived tasks.
```

The lab requires archived tasks to remain viewable, so having a dedicated empty archived page is the correct behaviour. `lab_one.pdf`

## Prompt:
8/3/2026, 8:47:54 PM

let continue

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> git log --oneline
4116cfb (HEAD -> master) feat: archive tasks without deleting their records
810b313 feat: allow existing tasks to be edited
e67c770 feat: create tasks and display the active task list
0a5c41f feat: add SQLite schema and database connection
c0d0844 chore: scaffold the local Next.js application
6c7539b Initial commit from Create Next App
PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab>

## Response:
8/3/2026, 8:47:57 PM

You now have six commits and the archive requirement is complete. Next we’ll implement:

1. Sorting by **topic**, **status**, and **due date**.
2. A visible **overdue** indicator.
3. Overdue derived from the due date rather than stored as a status.

These correspond to walkthrough items 5 and 6 and are also important for the database-design rubric. `lab_one.pdf`

# Step 6: Sorting and overdue tasks

## 1. Add sorting types

Open:

```text
src/lib/taskTypes.ts
```

Add this at the bottom:

```ts
export const TASK_SORT_OPTIONS = [
  "created",
  "topic",
  "status",
  "dueDate",
] as const;

export type TaskSortOption =
  (typeof TASK_SORT_OPTIONS)[number];
```

---

## 2. Update the task repository

Open:

```text
src/lib/taskRepository.ts
```

Update the import from `taskTypes` so it includes `TaskSortOption`:

```ts
import type {
  CreateTaskInput,
  Task,
  TaskSortOption,
  TaskStatus,
  UpdateTaskInput,
} from "@/lib/taskTypes";
```

Find your existing `getActiveTasks` function and replace it with:

```ts
export function getActiveTasks(
  sort: TaskSortOption = "created",
  database: Database.Database = db,
): Task[] {
  const orderBy: Record<TaskSortOption, string> = {
    created: "created_at DESC, id DESC",
    topic: "topic COLLATE NOCASE ASC, id DESC",
    status: `
      CASE status
        WHEN 'TODO' THEN 1
        WHEN 'IN_PROGRESS' THEN 2
        WHEN 'COMPLETE' THEN 3
      END ASC,
      id DESC
    `,
    dueDate: "due_date ASC, id DESC",
  };

  const rows = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE archived_at IS NULL
        ORDER BY ${orderBy[sort]}
      `,
    )
    .all() as TaskRow[];

  return rows.map(mapTaskRow);
}
```

This uses a fixed internal map rather than putting arbitrary user input directly into the SQL query.

---

## 3. Add the overdue rule

Create:

```text
src/lib/taskRules.ts
```

Add:

```ts
import type { Task } from "@/lib/taskTypes";

export function isTaskOverdue(
  task: Pick<Task, "dueDate" | "status">,
  today = new Date(),
): boolean {
  if (task.status === "COMPLETE") {
    return false;
  }

  const currentDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return task.dueDate < currentDate;
}
```

Important behaviour:

- A task due before today is overdue.
- A task due today is not overdue.
- A completed task is not marked overdue.
- Overdue is calculated at read/display time.
- `OVERDUE` is not added to the status options.

That is exactly what the brief requires. `lab_one.pdf`

---

## 4. Replace the task list component

Replace the full contents of:

```text
src/components/TaskList.tsx
```

with:

```tsx
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
```

---

## 5. Add the sorting control

Create:

```text
src/components/TaskSort.tsx
```

Add:

```tsx
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
        <option value="created">
          Recently created
        </option>

        <option value="topic">
          Topic
        </option>

        <option value="status">
          Status
        </option>

        <option value="dueDate">
          Due date
        </option>
      </select>

      <button type="submit">Sort</button>
    </form>
  );
}
```

---

## 6. Replace the home page

Replace the full contents of:

```text
src/app/page.tsx
```

with:

```tsx
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
    sort?: string;
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

  const selectedSort: TaskSortOption =
    isTaskSortOption(sort) ? sort : "created";

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
```

---

## 7. Add styling

Add the following to the bottom of:

```text
src/app/globals.css
```

```css
.sort-form {
  display: flex;
  align-items: end;
  gap: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  background: white;
}

.sort-form label {
  margin: 0;
}

.sort-form select {
  width: auto;
  min-width: 180px;
}

.task-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.task-heading h3 {
  margin-top: 0;
}

.task-overdue {
  border: 2px solid #a00000;
}

.overdue-label {
  padding: 6px 10px;
  border-radius: 4px;
  background: #a00000;
  color: white;
  font-weight: bold;
}
```

The colour is only a visual indicator. The actual overdue behaviour comes from `isTaskOverdue`.

---

# 8. Test sorting

Run:

```powershell
npm run lint
npm run dev
```

Create at least three active tasks:

### Task 1

```text
Title: Buy groceries
Description: Buy food for the week
Due date: 2026-08-06
Topic: Personal
Status: Todo
```

### Task 2

```text
Title: Finish documentation
Description: Write the project documentation
Due date: 2026-08-04
Topic: COMS3011A
Status: In-Progress
```

### Task 3

```text
Title: Submit exercise
Description: Upload the completed exercise
Due date: 2026-08-03
Topic: University
Status: Complete
```

Test each sorting option:

- Topic should order alphabetically.
- Status should order Todo, In-Progress, Complete.
- Due date should put the earliest date first.

Also look at the URL after sorting. It should resemble:

```text
http://localhost:3000/?sort=topic
```

---

# 9. Test overdue behaviour

Because today is 3 August 2026, create a task with:

```text
Due date: 2026-08-02
Status: Todo
```

It should show a visible **Overdue** label.

Then edit it and change the status to **Complete**. The overdue label should disappear.

Also confirm that the status dropdown still has only:

```text
Todo
In-Progress
Complete
```

Overdue must not appear as a selectable status. `lab_one.pdf`

---

# 10. Commit the feature

After all checks pass:

```powershell
Ctrl+C
npm run lint
git status
git add .
git commit `
  -m "feat: add task sorting and overdue indicators" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Then verify:

```powershell
git log --oneline
```

Your next stage will be the automated tests. We will test creation, archiving, sorting, and the overdue rule against a throwaway in-memory SQLite database, as required by the rubric. `lab_one.pdf`

## Prompt:
8/3/2026, 8:53:22 PM

where do i change the sorting type

## Response:
8/3/2026, 8:53:24 PM

You change the available sorting types in **two main places**.

### 1. Define the allowed sort values

Open:

```text
src/lib/taskTypes.ts
```

Find:

```ts
export const TASK_SORT_OPTIONS = [
  "created",
  "topic",
  "status",
  "dueDate",
] as const;
```

This controls which sort values are considered valid.

For example, to remove “Recently created” and only keep the three required sorts:

```ts
export const TASK_SORT_OPTIONS = [
  "topic",
  "status",
  "dueDate",
] as const;
```

The lab only requires sorting by topic, status, and due date. `lab_one.pdf`

### 2. Change the dropdown options

Open:

```text
src/components/TaskSort.tsx
```

Find:

```tsx
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
```

Change the labels or remove options here.

For example:

```tsx
<select
  id="sort"
  name="sort"
  defaultValue={selectedSort}
>
  <option value="topic">Topic A-Z</option>
  <option value="status">Status</option>
  <option value="dueDate">Due date: earliest first</option>
</select>
```

### 3. Change how each option sorts

Open:

```text
src/lib/taskRepository.ts
```

Inside `getActiveTasks`, find:

```ts
const orderBy: Record<TaskSortOption, string> = {
  created: "created_at DESC, id DESC",
  topic: "topic COLLATE NOCASE ASC, id DESC",
  status: `
    CASE status
      WHEN 'TODO' THEN 1
      WHEN 'IN_PROGRESS' THEN 2
      WHEN 'COMPLETE' THEN 3
    END ASC,
    id DESC
  `,
  dueDate: "due_date ASC, id DESC",
};
```

This controls the actual order.

For example, to show latest due dates first:

```ts
dueDate: "due_date DESC, id DESC",
```

To sort topics Z-A:

```ts
topic: "topic COLLATE NOCASE DESC, id DESC",
```

Since the current page defaults to `"created"`, leave that option in place unless you also change the default in `src/app/page.tsx`:

```ts
const selectedSort: TaskSortOption =
  isTaskSortOption(sort) ? sort : "created";
```

For a default of due date:

```ts
const selectedSort: TaskSortOption =
  isTaskSortOption(sort) ? sort : "dueDate";
```

## Prompt:
8/3/2026, 8:53:48 PM

The sorting dropdown isn't on the site

## Response:
8/3/2026, 8:53:49 PM

The most likely cause is that `TaskSort` was not added to the home page, or the file was created in the wrong folder.

Check these three files.

## 1. Confirm this file exists

```text
src/components/TaskSort.tsx
```

Use this full code:

```tsx
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
```

## 2. Replace `src/app/page.tsx`

Use this full version:

```tsx
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
    sort?: string;
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

  const selectedSort: TaskSortOption =
    isTaskSortOption(sort) ? sort : "created";

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
```

The important lines are:

```tsx
import { TaskSort } from "@/components/TaskSort";
```

and:

```tsx
<TaskSort selectedSort={selectedSort} />
```

## 3. Confirm the sort options exist

At the bottom of `src/lib/taskTypes.ts`, you should have:

```ts
export const TASK_SORT_OPTIONS = [
  "created",
  "topic",
  "status",
  "dueDate",
] as const;

export type TaskSortOption =
  (typeof TASK_SORT_OPTIONS)[number];
```

Then restart the server:

```powershell
Ctrl+C
npm run lint
npm run dev
```

Open:

```text
http://localhost:3000
```

The sorting box should appear between the create-task form and the active-task list.

If it still does not appear, run this and send me the output:

```powershell
Get-ChildItem src\components
Get-Content src\app\page.tsx
```

## Prompt:
8/3/2026, 8:55:26 PM

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab>
                                                     npm run lint

> todo-lab@0.1.0 lint
> eslint


C:\Users\nsund\DocumentsPS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab>
                                                     npm run lint

> todo-lab@0.1.0 lint
> eslint


C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab\src\lib\taskRepository.ts
  7:3  warning  'TaskSortOption' is defined but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (0 errors, 1 warning)

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> npm run dev

> todo-lab@0.1.0 dev
> next dev

▲ Next.js 16.2.12 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.56.1:3000
✓ Ready in 467ms

 GET / 200 in 425ms (next.js: 171ms, application-code: 254ms)
⨯ TypeError: database.prepare is not a function
    at getActiveTasks (src\lib\taskRepository.ts:84:6)
    at Home (src\app\archived\page.tsx:35:31)
  82 | ): Task[] {
  83 |   const rows = database
> 84 |     .prepare(
     |      ^
  85 |       `
  86 |         SELECT *
  87 |         FROM tasks {
  digest: '990000530'
}
 GET /archived 500 in 118ms (next.js: 47ms, application-code: 70ms)
[browser] Uncaught TypeError: database.prepare is not a function
    at getActiveTasks (src\lib\taskRepository.ts:84:6)
    at Home (src\app\archived\page.tsx:35:31)
    at resolveErrorDev (file://C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js:1919:105)
    at processFullStringRow (file://C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js:2434:29)
    at processFullBinaryRow (file://C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js:2393:9)
    at processBinaryChunk (file://C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js:2502:221)
    at progress (file://C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js:2689:13)
  82 | ): Task[] {
  83 |   const rows = database
> 84 |     .prepare(
     |      ^
  85 |       `
  86 |         SELECT *
  87 |         FROM tasks
\SDP Labs\Lab 1\todo-lab\src\lib\taskRepository.ts
  7:3  warning  'TaskSortOption' is defined but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (0 errors, 1 warning)

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> npm run dev

> todo-lab@0.1.0 dev
> next dev

▲ Next.js 16.2.12 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.56.1:3000
✓ Ready in 467ms

 GET / 200 in 425ms (next.js: 171ms, application-code: 254ms)
⨯ TypeError: database.prepare is not a function
    at getActiveTasks (src\lib\taskRepository.ts:84:6)
    at Home (src\app\archived\page.tsx:35:31)
  82 | ): Task[] {
  83 |   const rows = database
> 84 |     .prepare(
     |      ^
  85 |       `
  86 |         SELECT *
  87 |         FROM tasks {
  digest: '990000530'
}
 GET /archived 500 in 118ms (next.js: 47ms, application-code: 70ms)
[browser] Uncaught TypeError: database.prepare is not a function
    at getActiveTasks (src\lib\taskRepository.ts:84:6)
    at Home (src\app\archived\page.tsx:35:31)
    at resolveErrorDev (file://C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js:1919:105)
    at processFullStringRow (file://C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js:2434:29)
    at processFullBinaryRow (file://C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js:2393:9)
    at processBinaryChunk (file://C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js:2502:221)
    at progress (file://C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_164kp-6._.js:2689:13)
  82 | ): Task[] {
  83 |   const rows = database
> 84 |     .prepare(
     |      ^
  85 |       `
  86 |         SELECT *
  87 |         FROM tasks

## Response:
8/3/2026, 8:55:29 PM

The error is coming from your **archived page**, not the database connection.

Your `src/app/archived/page.tsx` is calling:

```ts
getActiveTasks(...)
```

and it is probably passing the database or another value as the first argument. After the sorting change, the first argument of `getActiveTasks` is now a sort option, so that value is being treated incorrectly.

The archived page should use `getArchivedTasks()` instead.

## Replace `src/app/archived/page.tsx`

Use this full file:

```tsx
import Link from "next/link";

import { getArchivedTasks } from "@/lib/taskRepository";
import type { Task } from "@/lib/taskTypes";

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

export default function ArchivedTasksPage() {
  const tasks = getArchivedTasks();

  return (
    <main>
      <h1>Archived tasks</h1>

      <p>
        <Link href="/">Back to active tasks</Link>
      </p>

      {tasks.length === 0 ? (
        <p>No archived tasks.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title}</h2>

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

              <p>Archived: {task.archivedAt}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

The important lines are:

```ts
import { getArchivedTasks } from "@/lib/taskRepository";
```

and:

```ts
const tasks = getArchivedTasks();
```

There should be no `getActiveTasks` call in the archived page.

## Fix the unused `TaskSortOption` warning

Your warning means you imported `TaskSortOption`, but your `getActiveTasks` function probably still has the old signature.

Open:

```text
src/lib/taskRepository.ts
```

Make sure the full `getActiveTasks` function is:

```ts
export function getActiveTasks(
  sort: TaskSortOption = "created",
  database: Database.Database = db,
): Task[] {
  const orderBy: Record<TaskSortOption, string> = {
    created: "created_at DESC, id DESC",
    topic: "topic COLLATE NOCASE ASC, id DESC",
    status: `
      CASE status
        WHEN 'TODO' THEN 1
        WHEN 'IN_PROGRESS' THEN 2
        WHEN 'COMPLETE' THEN 3
      END ASC,
      id DESC
    `,
    dueDate: "due_date ASC, id DESC",
  };

  const rows = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE archived_at IS NULL
        ORDER BY ${orderBy[sort]}
      `,
    )
    .all() as TaskRow[];

  return rows.map(mapTaskRow);
}
```

Also confirm the import near the top includes:

```ts
import type {
  CreateTaskInput,
  Task,
  TaskSortOption,
  TaskStatus,
  UpdateTaskInput,
} from "@/lib/taskTypes";
```

## Restart and test

Stop the server:

```powershell
Ctrl+C
```

Then run:

```powershell
npm run lint
npm run dev
```

Test both:

```text
http://localhost:3000
http://localhost:3000/archived
```

Expected result:

- `/` shows active tasks and the sorting dropdown.
- `/archived` shows archived tasks or “No archived tasks.”
- `npm run lint` shows no warning about `TaskSortOption`.

## Prompt:
8/3/2026, 8:56:32 PM

import type Database from "better-sqlite3";

import { db } from "@/lib/db";
import type {
  CreateTaskInput,
  Task,
  TaskSortOption,
  TaskStatus,
  UpdateTaskInput,
} from "@/lib/taskTypes";

type TaskRow = {
  id: number;
  title: string;
  description: string;
  due_date: string;
  topic: string;
  status: TaskStatus;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
};

function mapTaskRow(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    dueDate: row.due_date,
    topic: row.topic,
    status: row.status,
    archivedAt: row.archived_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createTask(
  input: CreateTaskInput,
  database: Database.Database = db,
): Task {
  const statement = database.prepare(`
    INSERT INTO tasks (
      title,
      description,
      due_date,
      topic,
      status
    )
    VALUES (
      @title,
      @description,
      @dueDate,
      @topic,
      @status
    )
  `);

  const result = statement.run({
    title: input.title.trim(),
    description: input.description.trim(),
    dueDate: input.dueDate,
    topic: input.topic.trim(),
    status: input.status,
  });

  const row = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE id = ?
      `,
    )
    .get(result.lastInsertRowid) as TaskRow;

  return mapTaskRow(row);
}

export function getActiveTasks(
  sort: TaskSortOption = "created",
  database: Database.Database = db,
): Task[] {
  const orderBy: Record<TaskSortOption, string> = {
    created: "created_at DESC, id DESC",
    topic: "topic COLLATE NOCASE ASC, id DESC",
    status: `
      CASE status
        WHEN 'TODO' THEN 1
        WHEN 'IN_PROGRESS' THEN 2
        WHEN 'COMPLETE' THEN 3
      END ASC,
      id DESC
    `,
    dueDate: "due_date ASC, id DESC",
  };

  const rows = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE archived_at IS NULL
        ORDER BY ${orderBy[sort]}
      `,
    )
    .all() as TaskRow[];

  return rows.map(mapTaskRow);
}

export function getTaskById(
  id: number,
  database: Database.Database = db,
): Task | null {
  const row = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE id = ?
      `,
    )
    .get(id) as TaskRow | undefined;

  return row ? mapTaskRow(row) : null;
}

export function updateTask(
  input: UpdateTaskInput,
  database: Database.Database = db,
): Task {
  const result = database
    .prepare(
      `
        UPDATE tasks
        SET
          title = @title,
          description = @description,
          due_date = @dueDate,
          topic = @topic,
          status = @status,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = @id
      `,
    )
    .run({
      id: input.id,
      title: input.title.trim(),
      description: input.description.trim(),
      dueDate: input.dueDate,
      topic: input.topic.trim(),
      status: input.status,
    });

  if (result.changes === 0) {
    throw new Error("Task not found.");
  }

  const updatedTask = getTaskById(input.id, database);

  if (!updatedTask) {
    throw new Error("Updated task could not be loaded.");
  }

  return updatedTask;
}

export function archiveTask(
  id: number,
  database: Database.Database = db,
): Task {
  const result = database
    .prepare(
      `
        UPDATE tasks
        SET
          archived_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
          AND archived_at IS NULL
      `,
    )
    .run(id);

  if (result.changes === 0) {
    throw new Error("Active task not found.");
  }

  const archivedTask = getTaskById(id, database);

  if (!archivedTask) {
    throw new Error("Archived task could not be loaded.");
  }

  return archivedTask;
}

export function getArchivedTasks(
  database: Database.Database = db,
): Task[] {
  const rows = database
    .prepare(
      `
        SELECT *
        FROM tasks
        WHERE archived_at IS NOT NULL
        ORDER BY archived_at DESC, id DESC
      `,
    )
    .all() as TaskRow[];

  return rows.map(mapTaskRow);
}

## Response:
8/3/2026, 8:56:36 PM

Your `taskRepository.ts` looks correct. The `TaskSortOption` import is being used properly in:

```ts
sort: TaskSortOption = "created"
```

and:

```ts
const orderBy: Record<TaskSortOption, string>
```

So the earlier lint warning should disappear once this exact version is saved.

The runtime error came from the archived page calling `getActiveTasks` incorrectly. In your current function signature:

```ts
getActiveTasks(
  sort: TaskSortOption = "created",
  database: Database.Database = db,
)
```

the **first argument is the sort type**, not the database. Passing a database as the first argument causes `database` to become a string or other invalid value later, producing:

```text
database.prepare is not a function
```

Make sure `src/app/archived/page.tsx` contains:

```ts
import { getArchivedTasks } from "@/lib/taskRepository";
```

and:

```ts
const tasks = getArchivedTasks();
```

It must not contain:

```ts
getActiveTasks(...)
```

Then restart Next.js fully:

```powershell
Ctrl+C
Remove-Item -Recurse -Force .next
npm run lint
npm run dev
```

Test:

```text
http://localhost:3000
http://localhost:3000/archived
```

Expected behaviour:

- `/` shows the sorting dropdown and active tasks.
- `/archived` shows archived tasks or `No archived tasks.`
- Lint reports no `TaskSortOption` warning.

Your repository design is also still aligned with the lab requirement: archived tasks remain in the same table, while overdue is derived rather than stored. `lab_one.pdf`

## Prompt:
8/3/2026, 8:57:42 PM

there is no sort option

Todo Application
View archived tasks

Create a task
Title
Description

Due date

yyyy/mm/dd
Topic
Status

Todo
Create task
Active tasks
Submit exercise
Upload the completed exercise

Topic
University
Status
Complete
Due date
2026-08-03
Edit task
Archive task
Finish documentation
Write the project documentation

Topic
COMS3011A
Status
In-Progress
Due date
2026-08-04
Edit task
Archive task
Buy groceries
Buy food for the week

Topic
Personal
Status
Todo
Due date
2026-08-06
Edit task
Archive task

## Response:
8/3/2026, 8:57:44 PM

Your home page is still using the older version of `src/app/page.tsx`. The repository code is ready for sorting, but the `<TaskSort />` component is not being rendered.

Replace the entire contents of:

```text
src/app/page.tsx
```

with:

```tsx
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
    sort?: string;
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

  const selectedSort: TaskSortOption =
    isTaskSortOption(sort) ? sort : "created";

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
```

Also make sure this file exists:

```text
src/components/TaskSort.tsx
```

with:

```tsx
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
```

Then restart:

```powershell
Ctrl+C
Remove-Item -Recurse -Force .next
npm run lint
npm run dev
```

The sorting control should appear between **Create task** and **Active tasks**.

You should then be able to test the three required sorts: topic, status and due date. `lab_one.pdf`

## Prompt:
8/3/2026, 9:03:25 PM

You are incorect in your changes do a full review of my current files to correctly implement the sort task feauture

[Attachment: todo-lab.zip]

## Response:
8/3/2026, 9:03:26 PM

> **Inspecting Todo Zip Contents**
>
>
> **Reviewing sorting implementation**
>
> I’m checking the page flow and related files. The key issue is that the page never reads URL parameters or renders the sorting control, so the repository’s sorting logic is never reached.
>
> **Reviewed sorting implementation**
>
> 
>
> **Reading repository guidance and project documentation**
>
>
> **Correcting the diagnosis**
>
> You’re right—the archived page is already correct. I’m locating the actual break: `src/app/page.tsx` neither renders `TaskSort` nor passes URL sorting into `getActiveTasks`, so the existing repository logic never runs.
>
> **Corrected the diagnosis**
>
> 
>
> **Creating focused patch for task sorting fixes**
>
>
> **Inspected and patched task sorting, validation, and project build files**
>
> 
>
> Worked for 3m 53s

You were right-the earlier diagnosis focused on the wrong file. I reviewed the uploaded project itself.

## What is actually wrong

Your sorting implementation is already present in four places:

- `src/components/TaskSort.tsx` contains the dropdown.
- `src/lib/taskTypes.ts` defines the valid sort options.
- `src/lib/taskRepository.ts` contains the SQL ordering logic.
- `src/app/globals.css` contains the sorting-form styling.

Your archived page is also currently correct: it calls `getArchivedTasks()`.

The missing connection is **`src/app/page.tsx`**. Your current version:

- Does not import `TaskSort`.
- Does not render `<TaskSort />`.
- Does not read the `?sort=` query parameter.
- Always calls `getActiveTasks()` with the default `"created"` sort.

That is why the dropdown never appears and changing the URL would not affect the ordering.

## Replace `src/app/page.tsx`

Replace the entire file with:

```tsx
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
```

This version is correct for your installed Next.js 16 project, where `searchParams` is asynchronous.

## Do not change these files

Your current versions of these files already support sorting:

```text
src/components/TaskSort.tsx
src/lib/taskTypes.ts
src/lib/taskRepository.ts
src/app/globals.css
src/app/archived/page.tsx
```

In particular, this repository signature is correct:

```ts
export function getActiveTasks(
  sort: TaskSortOption = "created",
  database: Database.Database = db,
): Task[]
```

And this mapping correctly limits SQL ordering to known values:

```ts
const orderBy: Record<TaskSortOption, string> = {
  created: "created_at DESC, id DESC",
  topic: "topic COLLATE NOCASE ASC, id DESC",
  status: `
    CASE status
      WHEN 'TODO' THEN 1
      WHEN 'IN_PROGRESS' THEN 2
      WHEN 'COMPLETE' THEN 3
    END ASC,
    id DESC
  `,
  dueDate: "due_date ASC, id DESC",
};
```

## Restart and test

Stop the development server:

```powershell
Ctrl+C
```

Clear the Next.js cache and run the checks:

```powershell
Remove-Item -Recurse -Force .next
npm run lint
npm run dev
```

You should now see the sorting form between **Create a task** and **Active tasks**.

Test each direct URL:

```text
http://localhost:3000/?sort=topic
http://localhost:3000/?sort=status
http://localhost:3000/?sort=dueDate
```

With your three example tasks, the expected results are:

**Topic:**

```text
Finish documentation - COMS3011A
Buy groceries - Personal
Submit exercise - University
```

**Status:**

```text
Buy groceries - Todo
Finish documentation - In-Progress
Submit exercise - Complete
```

**Due date:**

```text
Submit exercise - 2026-08-03
Finish documentation - 2026-08-04
Buy groceries - 2026-08-06
```

I verified the corrected version against your extracted project with both ESLint and TypeScript type-checking. A full Next production build could not run in this sandbox because Next attempted to download a Linux SWC binary that was unavailable here.

The lab specifically requires sorting by topic, status and due date. `lab_one.pdf`

## Downloadable fix

[Download the corrected page file](sandbox:/mnt/data/sort-feature-fix-files.zip)

[Download the focused code patch](sandbox:/mnt/data/sort-feature-fix.patch)

Once the dropdown and all three sorting modes work, commit it:

```powershell
git add .
git commit `
  -m "feat: add task sorting and overdue indicators" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

That attribution format complies with the course AI policy. `ai_policy.pdf`

## Prompt:
8/3/2026, 9:10:51 PM

help me add it to this github repo https://github.com/NadavSundy/2698600-SDPLab1.git make sure to keep the git history and satsfy all submission requirments.

## Response:
8/3/2026, 9:10:53 PM

> **Inspected repository history and submission requirements**
>
> 
>
> **Inspecting uploaded project archive contents**
>
>
> **Planning the repository update**
>
> I’m assessing the repository history, current status, and AI-policy requirements first. I’m not pushing anything yet because preserving commits and meeting submission rules require confirming the remote setup and available access.
>
> **Planned the repository update**
>
> 
>
> **Inspecting Git History, Status, and Submission Files**
>
>
> **Auditing submission readiness**
>
> I’m verifying the repository instead of relying on the earlier review. The project appears incomplete: the edit page and home sorting need correction, while tests, documentation, and AI-use records still need attention before preserving history and publishing safely.
>
> **Audited submission readiness**
>
> 
>
> **Reviewing Local Changes And Submission Readiness**
>
>
> **Inspected project archive, repository history, changes, tests, and submission readiness**
>
> 
>
> Worked for 2m 59s

I checked the GitHub repository. It is currently **empty**, its default branch is `main`, and you have permission to push to it.

To preserve your existing six-commit history, push from your current local Git repository. Do **not** upload the ZIP or add files through GitHub’s website, because that would not preserve the local commits.

## 1. Push the existing history now

From:

```text
C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab
```

run:

```powershell
git remote add origin https://github.com/NadavSundy/2698600-SDPLab1.git
git branch -M main
git push -u origin main
```

Renaming `master` to `main` does not rewrite or remove any commits.

Confirm it:

```powershell
git remote -v
git log --oneline --decorate
```

Your current six commits will be pushed. Your uncommitted sorting work will remain safely on your computer and will not be included until you commit it.

If Git says `remote origin already exists`, use:

```powershell
git remote set-url origin https://github.com/NadavSundy/2698600-SDPLab1.git
git branch -M main
git push -u origin main
```

## 2. Current submission review

I reviewed the uploaded project, including its `.git` history.

| Requirement | Current state |
|---|---|
| Six or more commits | Met: six commits |
| Create tasks | Implemented |
| Edit tasks | Implemented in the committed version, but currently broken in the uncommitted working tree |
| Archive without deletion | Implemented |
| Archived-task view | Implemented |
| Sorting | Repository logic exists, but the home page does not render the sorting component |
| Overdue indicator | Logic and display exist |
| Persistence | SQLite implemented |
| Three real tests | Missing |
| Single documented test command | Missing |
| Third-party-code documentation | Missing |
| Database-design documentation | Missing |
| Exact clean-clone running instructions | Missing |
| AI declaration in README | Missing |
| AI transcript | Missing |
| Clean-clone verification | Not yet completed |

The lab specifically requires three tests, accurate documentation, AI transcripts and exact clean-clone commands. `lab_one.pdf`

## 3. Fix the current uncommitted sorting work

Your working tree has two important problems:

1. `src/app/page.tsx` still contains the old home page and does not render `TaskSort`.
2. `src/app/tasks/[id]/edit/page.tsx` has accidentally been replaced with home-page sorting code.

Several other files appear modified mainly because their line endings changed.

First restore files that do not need to be part of the sorting commit:

```powershell
git restore database/schema.sql
git restore src/app/actions.ts
git restore src/app/archived/page.tsx
git restore src/components/TaskForm.tsx
git restore src/lib/db.ts
```

### Replace `src/app/page.tsx`

```tsx
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
```

### Replace `src/app/tasks/[id]/edit/page.tsx`

```tsx
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

      <form className="task-form" action={updateTaskAction}>
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

      <p>
        <Link href="/">Back to tasks</Link>
      </p>
    </main>
  );
}
```

Add this to the bottom of `src/app/globals.css` if it is not already present:

```css
.task-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
}

.task-actions form {
  margin: 0;
  padding: 0;
}
```

## 4. Verify the feature before committing

Run:

```powershell
npm run lint
npx tsc --noEmit
npm run dev
```

Check:

```text
http://localhost:3000/?sort=topic
http://localhost:3000/?sort=status
http://localhost:3000/?sort=dueDate
```

Also verify:

- The sorting dropdown appears.
- All three sorts change the displayed order.
- Editing a task opens the edit form rather than the home page.
- An incomplete task with a past date says **Overdue**.
- A completed task with a past date does not say **Overdue**.
- Overdue is not available in the status dropdown.

## 5. Commit and push the sorting feature

Once those checks pass:

```powershell
git status
git diff --check
git add .

git commit `
  -m "feat: add task sorting and overdue indicators" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"

git push
```

The `Assisted-by` line is required for AI-assisted code generation under the course policy. `ai_policy.pdf`

## 6. Remaining commits before submission

Do not combine everything into one final bulk commit. Use at least these additional coherent commits:

```text
test: cover task creation archiving sorting and overdue rules
docs: document dependencies database design and run commands
docs: add AI usage declaration and assessment transcript
fix: verify installation and operation from a clean clone
```

The test commit must add at least three deterministic tests using a throwaway SQLite database, including archiving or overdue behaviour. The documentation commit must replace the default Next.js README and include the Node version plus exact install, run and test commands. `lab_one.pdf`

The AI transcript should preserve this conversation, including the point where you identified that my previous sorting guidance was incorrect and requested a full review. That directly supports the rubric’s requirement that you reject or redirect an unsuitable AI output. 

Run the first GitHub push now and send the output of:

```powershell
git push -u origin main
git log --oneline --decorate
git status
```

## Prompt:
8/3/2026, 11:00:33 PM

the home page now sort give me the code to commit and then the next steps

## Response:
8/3/2026, 11:00:50 PM

> **Reviewing next steps**
>
> I’m outlining the remaining workflow: run linting and type checks, commit with attribution, confirm the branch, push changes, then add tests, documentation, and a clean-clone verification pass.
>
> **Reviewed next steps**
>
> 
>
> **Designing repository tests**
>
> I’m planning deterministic tests around an in-memory database: creation, archiving, sorting, and overdue logic. I’m also checking whether the production database connection should be lazily initialized to avoid test-side effects.
>
> **Designed repository tests**
>
> 
>
> **Providing Git commit and push commands**
>
>
> **Validating Tests After Restoring Permissions**
>
> 
>
> Worked for 2m 5s

Since sorting now works, commit it as a **new commit**. Do not amend an older commit; keeping the progression visible helps your commit-history mark.

## 1. Verify and commit the sorting feature

Stop the development server with `Ctrl+C`, then run:

```powershell
npm run lint
npx tsc --noEmit
git diff --check
git status
```

Review the changes:

```powershell
git diff
```

Stage the source-code changes:

```powershell
git add src
```

Check exactly what will be committed:

```powershell
git diff --cached --stat
git status
```

Commit it:

```powershell
git commit `
  -m "feat: add task sorting and overdue indicators" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

The `Assisted-by` line is required for AI-assisted code commits under the course policy. `ai_policy.pdf`

Confirm the commit:

```powershell
git log --oneline -3
```

You should see the new sorting commit above the archive commit.

## 2. Push the history to GitHub

Check your branch:

```powershell
git branch --show-current
```

If it says `master`, rename it without changing any history:

```powershell
git branch -M main
```

Check the remote:

```powershell
git remote -v
```

If no `origin` appears:

```powershell
git remote add origin https://github.com/NadavSundy/2698600-SDPLab1.git
```

If `origin` exists but points somewhere else:

```powershell
git remote set-url origin https://github.com/NadavSundy/2698600-SDPLab1.git
```

Push all existing commits:

```powershell
git push -u origin main
```

From then onward, you can normally use:

```powershell
git push
```

# Next step: automated tests

The lab requires at least three tests that exercise real behaviour, including archiving or overdue behaviour. They must use a throwaway database and run from one documented command. `lab_one.pdf`

You already installed Vitest, so now add the configuration and tests.

## 3. Add the test command

Open `package.json`.

Change the `scripts` section to include:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run"
}
```

Be careful with commas because this is JSON.

## 4. Create `vitest.config.ts`

Create this file in the project root:

```text
vitest.config.ts
```

Add:

```ts
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
  },
});
```

This allows the tests to understand imports such as:

```ts
import { createTask } from "@/lib/taskRepository";
```

## 5. Create the test file

Create the folder:

```powershell
mkdir tests
```

Create:

```text
tests/taskRepository.test.ts
```

Add:

```ts
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

vi.mock("@/lib/db", () => ({
  db: undefined,
}));

import {
  archiveTask,
  createTask,
  getActiveTasks,
  getArchivedTasks,
} from "@/lib/taskRepository";
import { isTaskOverdue } from "@/lib/taskRules";

let database: Database.Database;

beforeEach(() => {
  database = new Database(":memory:");

  const schema = fs.readFileSync(
    path.join(process.cwd(), "database", "schema.sql"),
    "utf8",
  );

  database.exec(schema);
});

afterEach(() => {
  database.close();
});

describe("task repository", () => {
  it("creates a task containing all required fields", () => {
    const task = createTask(
      {
        title: "  Finish lab  ",
        description: "Write the automated tests",
        dueDate: "2026-08-04",
        topic: "  COMS3011A  ",
        status: "TODO",
      },
      database,
    );

    expect(task).toMatchObject({
      title: "Finish lab",
      description: "Write the automated tests",
      dueDate: "2026-08-04",
      topic: "COMS3011A",
      status: "TODO",
      archivedAt: null,
    });

    expect(
      getActiveTasks("created", database),
    ).toHaveLength(1);
  });

  it("archives a task without deleting its record", () => {
    const task = createTask(
      {
        title: "Archive me",
        description: "The record must remain viewable",
        dueDate: "2026-08-05",
        topic: "Testing",
        status: "IN_PROGRESS",
      },
      database,
    );

    archiveTask(task.id, database);

    expect(
      getActiveTasks("created", database),
    ).toHaveLength(0);

    const archivedTasks = getArchivedTasks(database);

    expect(archivedTasks).toHaveLength(1);
    expect(archivedTasks[0].id).toBe(task.id);
    expect(archivedTasks[0].archivedAt).not.toBeNull();
  });

  it("sorts active tasks by topic, status and due date", () => {
    createTask(
      {
        title: "Task Z",
        description: "",
        dueDate: "2026-08-06",
        topic: "Zulu",
        status: "COMPLETE",
      },
      database,
    );

    createTask(
      {
        title: "Task A",
        description: "",
        dueDate: "2026-08-04",
        topic: "Alpha",
        status: "TODO",
      },
      database,
    );

    createTask(
      {
        title: "Task M",
        description: "",
        dueDate: "2026-08-05",
        topic: "Mike",
        status: "IN_PROGRESS",
      },
      database,
    );

    expect(
      getActiveTasks("topic", database).map(
        (task) => task.topic,
      ),
    ).toEqual([
      "Alpha",
      "Mike",
      "Zulu",
    ]);

    expect(
      getActiveTasks("status", database).map(
        (task) => task.status,
      ),
    ).toEqual([
      "TODO",
      "IN_PROGRESS",
      "COMPLETE",
    ]);

    expect(
      getActiveTasks("dueDate", database).map(
        (task) => task.dueDate,
      ),
    ).toEqual([
      "2026-08-04",
      "2026-08-05",
      "2026-08-06",
    ]);
  });
});

describe("overdue rule", () => {
  const today = new Date(2026, 7, 3);

  it("flags only incomplete tasks whose due date has passed", () => {
    expect(
      isTaskOverdue(
        {
          dueDate: "2026-08-02",
          status: "TODO",
        },
        today,
      ),
    ).toBe(true);

    expect(
      isTaskOverdue(
        {
          dueDate: "2026-08-03",
          status: "IN_PROGRESS",
        },
        today,
      ),
    ).toBe(false);

    expect(
      isTaskOverdue(
        {
          dueDate: "2026-08-02",
          status: "COMPLETE",
        },
        today,
      ),
    ).toBe(false);
  });
});
```

The tests use a fresh SQLite `:memory:` database before every test, so they do not rely on your normal `data/todo.db`.

## 6. Run the tests

Run:

```powershell
npm test
```

You should see four passing tests.

Then run all checks:

```powershell
npm run lint
npx tsc --noEmit
npm test
```

## 7. Commit and push the tests

```powershell
git status
git add package.json vitest.config.ts tests
git add package-lock.json
```

It is okay if `package-lock.json` has no changes.

Commit:

```powershell
git commit `
  -m "test: cover task creation archiving sorting and overdue rules" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Push:

```powershell
git push
```

After the test commit, the remaining work is:

1. Replace the default README with exact clean-clone instructions.
2. Document third-party code and why each dependency was selected.
3. Document the database table and relationships.
4. Add the required AI declarations and transcript.
5. Perform a clean-clone walkthrough before submitting the GitHub link.

## Prompt:
8/3/2026, 11:07:12 PM

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> npm run lint

> todo-lab@0.1.0 lint
> eslint

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> npx tsc --noEmit
PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab> npm test

> todo-lab@0.1.0 test
> vitest run

(!) Your Vite config uses features that are unsupported by `configLoader: 'native'`, which is planned to become the default in a future major version of Vite:
  - ESM syntax in a file loaded as CommonJS (vitest.config.ts:1:1). Use a `.mjs` extension or set `"type": "module"` in the closest package.json
Set `VITE_CONFIG_NATIVE_IGNORE_WARNING=true` to suppress this warning.

 RUN  v4.1.10 C:/Users/nsund/Documents/SDP Labs/Lab 1/todo-lab

 ✓ tests/taskRepository.test.ts (4 tests) 11ms
   ✓ task repository (3)
     ✓ creates a task containing all required fields 6ms
     ✓ archives a task without deleting its record 1ms
     ✓ sorts active tasks by topic, status and due date 1ms
   ✓ overdue rule (1)
     ✓ flags only incomplete tasks whose due date has passed 1ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  23:06:54
   Duration  259ms (transform 42ms, setup 0ms, import 74ms, tests 11ms, environment 0ms)

PS C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab>

## Response:
8/3/2026, 11:07:25 PM

Excellent - all checks pass, and the four tests satisfy the lab’s testing requirement: they exercise real behaviour, include both archiving and overdue logic, and use a fresh in-memory SQLite database rather than your personal database. `lab_one.pdf`

## 1. Remove the Vitest warning

The warning does not fail the tests, but it is better to submit with clean output.

Rename the config file:

```powershell
Rename-Item vitest.config.ts vitest.config.mts
```

Then rerun:

```powershell
npm test
```

You should still see:

```text
Test Files  1 passed
Tests       4 passed
```

but without the CommonJS/ESM warning.

## 2. Commit the tests

Check your changes:

```powershell
git status
```

Stage the test-related files:

```powershell
git add package.json package-lock.json vitest.config.mts tests
```

Review what is staged:

```powershell
git diff --cached --stat
```

Commit:

```powershell
git commit `
  -m "test: cover task creation archiving sorting and overdue rules" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

The AI attribution line is required for commits containing AI-generated code. `ai_policy.pdf`

Push it:

```powershell
git push
```

If this is your first push and your branch is still called `master`, use:

```powershell
git branch -M main
git remote add origin https://github.com/NadavSundy/2698600-SDPLab1.git
git push -u origin main
```

If `origin` already exists, do not add it again.

## 3. Confirm the history

Run:

```powershell
git log --oneline --decorate
```

You should now have commits resembling:

```text
test: cover task creation archiving sorting and overdue rules
feat: add task sorting and overdue indicators
feat: archive tasks without deleting their records
feat: allow existing tasks to be edited
feat: create tasks and display the active task list
feat: add SQLite schema and database connection
chore: scaffold the local Next.js application
Initial commit from Create Next App
```

That gives you a strong, incremental history rather than a bulk application dump.

# Next stage: documentation

The lab requires three specific documentation areas:

1. Third-Party Code
2. Database Design
3. Running It

The instructions must include the Node version and exact commands needed from a clean clone. `lab_one.pdf`

Create the documentation folder:

```powershell
New-Item -ItemType Directory -Path docs -Force
```

Create these files:

```powershell
New-Item -ItemType File -Path docs\THIRD_PARTY_CODE.md -Force
New-Item -ItemType File -Path docs\DATABASE_DESIGN.md -Force
```

We will put the running instructions directly in `README.md`.

## 4. Create `docs/THIRD_PARTY_CODE.md`

Use:

```md
# Third-Party Code

This document records the main third-party libraries and packages used by the project.

## Application Dependencies

### Next.js

Next.js provides the application framework, routing, server components, and server actions used to build the local todo application.

### React

React provides the component model used to construct the user interface.

### React DOM

React DOM renders the React components within the browser.

### better-sqlite3

better-sqlite3 provides synchronous access to the local SQLite database. It was chosen because the application is local-only and does not require a remote database server.

## Development Dependencies

### TypeScript

TypeScript provides static type checking for the application and database-layer code.

### ESLint

ESLint checks the source code for potential errors and inconsistent patterns.

### eslint-config-next

eslint-config-next provides linting rules recommended for Next.js projects.

### @types/node

This package provides TypeScript declarations for Node.js APIs.

### @types/react

This package provides TypeScript declarations for React.

### @types/react-dom

This package provides TypeScript declarations for React DOM.

### @types/better-sqlite3

This package provides TypeScript declarations for better-sqlite3.

### Vitest

Vitest runs the automated tests. It was chosen because it supports TypeScript, has a simple command-line runner, and allows the repository tests to run through one documented command.

## AI Declaration

The preceding document was planned, reviewed and edited with the assistance of ChatGPT-Web[GPT-5.6 Thinking].
```

Check your `package.json` after creating this. Every dependency listed there should appear in this document with a reason.

## 5. Create `docs/DATABASE_DESIGN.md`

Use:

```md
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
```

This matches the rubric’s preferred design: one task table, archive represented by a timestamp, and overdue derived at read time. `lab_one.pdf`

Do not commit these documentation files yet. The next step is replacing the default Next.js README with accurate clean-clone instructions, AI declarations, links to these documents, and the required test command.

## Prompt:
8/3/2026, 11:10:17 PM

done the above, let move on

## Response:
8/3/2026, 11:10:36 PM

> **Planning documentation**
>
> I’m outlining the next repository steps: create a README, preserve the transcript unchanged, add an AI-usage note, and document traceability without exposing internal implementation details.
>
> **Planned documentation**
>
> 
>
> Worked for 21s

Next, replace the default Next.js README with accurate clean-clone instructions, commit the documentation, add the AI transcript, and perform the final clean-clone test.

# Step 8: Replace `README.md`

Replace the entire contents of `README.md` with:

```md
# COMS3011A Lab 1 - Local Todo Application

A local-first todo application built with Next.js and SQLite.

The application is intended for a single user running it locally. It does not use user accounts or require an external database server.

## Features

- Create tasks with a title, description, due date, topic, and status.
- Edit existing tasks.
- Archive tasks without deleting their database records.
- View archived tasks.
- Sort active tasks by topic, status, or due date.
- Display overdue tasks without treating overdue as a task status.
- Persist all task information in a local SQLite database.

## Requirements

The project was developed and verified using:

- Node.js `v24.11.0`
- npm

The Node.js version can be checked with:

```bash
node --version
```

## Running It

### 1. Clone the repository

```bash
git clone https://github.com/NadavSundy/2698600-SDPLab1.git
cd 2698600-SDPLab1
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Start the development server

```bash
npm run dev
```

Open the following address in a browser:

```text
http://localhost:3000
```

The SQLite database is created automatically in the `data` directory when the application first accesses it.

Stop the server using `Ctrl+C`.

## Running the Automated Tests

Run all automated tests with one command:

```bash
npm test
```

The tests use temporary in-memory SQLite databases and do not depend on the developer's local database file.

## Additional Checks

Run ESLint:

```bash
npm run lint
```

Run TypeScript checking:

```bash
npx tsc --noEmit
```

Create a production build:

```bash
npm run build
```

Run the production build after building:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Documentation

- [Third-Party Code](docs/THIRD_PARTY_CODE.md)
- [Database Design](docs/DATABASE_DESIGN.md)
- [AI Usage and Transcript Information](docs/AI_USAGE.md)

## Database Storage

The application stores its persistent database at:

```text
data/todo.db
```

The local database and its SQLite support files are excluded from Git. A fresh database is automatically created from `database/schema.sql`.

## AI Usage

This repository makes use of AI code generation using the following tools:

- ChatGPT-Web[GPT-5.6 Thinking]

This repository does not use AI in-line editing tools.

This repository makes use of AI code review using the following tools:

- ChatGPT-Web[GPT-5.6 Thinking]

The assessment AI transcript is included under the `docs/transcripts` directory.

## AI Declaration

The preceding document was planned, generated, reviewed and edited with the assistance of ChatGPT-Web[GPT-5.6 Thinking].
```

This gives the marker the exact installation, run and testing commands required by the rubric. `lab_one.pdf`

# Step 9: Add the AI usage index

Create:

```text
docs/AI_USAGE.md
```

Use:

```md
# AI Usage

## Tools and Models

The following AI tool was used during this assessment:

- Tool: ChatGPT Web
- Model: GPT-5.6 Thinking
- Uses: Project planning, code generation, debugging, code review, test generation, and documentation assistance.

## Usage Approach

AI was used for individual project tasks rather than generating the entire application as a single output.

The work was divided into separate stages:

1. Project setup.
2. SQLite schema and connection.
3. Task creation and display.
4. Task editing.
5. Task archiving.
6. Sorting and overdue behaviour.
7. Automated testing.
8. Documentation and submission review.

All generated code was run, inspected, tested, and committed incrementally.

## Corrections and Redirections

During implementation, an initial AI response incorrectly identified the cause of the missing sorting interface.

The project files were then supplied for a full review. The review identified that the repository sorting logic and sorting component already existed, but the current home page did not render the component or pass the selected sort option into the repository.

The AI output was redirected, the current files were reviewed, and the home-page integration was corrected.

Other debugging included:

- Removing duplicate task-repository imports.
- Restoring missing imports for task-status validation.
- Correcting the archived page to use `getArchivedTasks`.
- Fixing a route that returned a 404 because the archived page was missing or incorrectly placed.
- Renaming the Vitest configuration to avoid an ESM configuration warning.

## Traceability

The repository commit history records the implementation in separate stages. Commits containing AI-generated code include an `Assisted-by` trailer identifying the tool and model.

The full unedited assessment conversation is stored in:

```text
docs/transcripts/chatgpt-lab-one-transcript.pdf
```

## Responsibility

All generated code and documentation were reviewed and tested before submission. The repository author remains responsible for the submitted work.

## AI Declaration

The preceding document was planned, generated, reviewed and edited with the assistance of ChatGPT-Web[GPT-5.6 Thinking].
```

This records a genuine example where you rejected an unsuitable answer and redirected the AI, which is specifically rewarded in the AI-usage rubric. `lab_one.pdf`

# Step 10: Add the unedited transcript

Create the directory:

```powershell
New-Item -ItemType Directory -Path docs\transcripts -Force
```

Save this complete conversation, without editing or shortening it, as:

```text
docs/transcripts/chatgpt-lab-one-transcript.pdf
```

The transcript should include:

- The original lab discussion.
- All code-generation responses.
- Your error messages.
- The incorrect sorting guidance.
- Your request for a full review.
- The corrected implementation.

Do not replace the transcript with the summary in `AI_USAGE.md`. The lab explicitly asks for transcripts of planning, generation and debugging, while the summary only helps the marker navigate that evidence. `lab_one.pdf`

# Step 11: Commit the required documentation

First check the files:

```powershell
git status
```

Stage the README and technical documentation:

```powershell
git add README.md
git add docs\THIRD_PARTY_CODE.md
git add docs\DATABASE_DESIGN.md
```

Commit:

```powershell
git commit `
  -m "docs: document dependencies database design and run commands" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Then stage the AI documentation and transcript:

```powershell
git add docs\AI_USAGE.md
git add docs\transcripts\chatgpt-lab-one-transcript.pdf
```

Commit separately:

```powershell
git commit `
  -m "docs: add AI usage record and assessment transcript" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

Push both commits:

```powershell
git push
```

# Step 12: Verify from a clean clone

This is essential because the first walkthrough step can determine whether the functional demonstration receives any marks. The marker will begin from a clean clone and follow the README. `lab_one.pdf`

Make sure your current work is committed:

```powershell
git status
```

It should say:

```text
nothing to commit, working tree clean
```

Move to the parent directory:

```powershell
cd ..
```

Clone into a completely separate folder:

```powershell
git clone https://github.com/NadavSundy/2698600-SDPLab1.git 2698600-SDPLab1-clean-test
cd 2698600-SDPLab1-clean-test
```

Follow only the README instructions:

```powershell
node --version
npm ci
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

Open:

```text
http://localhost:3000
```

## Manual walkthrough

Perform these checks in order:

1. Create a task containing all four information fields.
2. Confirm it appears in the active list.
3. Edit the task and reload the page.
4. Confirm the edit remains.
5. Archive the task.
6. Confirm it leaves the active list.
7. Open the archived-task page.
8. Confirm the archived task remains viewable.
9. Create several active tasks and sort by topic.
10. Sort by status.
11. Sort by due date.
12. Create an incomplete task with a past due date.
13. Confirm it is marked overdue.
14. Confirm Overdue is not a selectable status.
15. Stop the server with `Ctrl+C`.
16. Run `npm run dev` again.
17. Confirm all task data remains.

If all checks pass, remove the temporary clone:

```powershell
cd ..
Remove-Item -Recurse -Force 2698600-SDPLab1-clean-test
```

# Step 13: Record the clean-clone verification

Return to your original repository:

```powershell
cd "C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab"
```

Create:

```text
docs/CLEAN_CLONE_VERIFICATION.md
```

Use:

```md
# Clean Clone Verification

The repository was tested from a new clone using Node.js v24.11.0.

The following commands were run successfully:

```bash
npm ci
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

The functional walkthrough was then manually verified:

- A task was created with all required fields.
- The task appeared in the active list.
- An existing task was edited and the change survived a reload.
- A task was archived and removed from the active list.
- The archived task remained visible on the archived-task page.
- Active tasks were sorted by topic, status, and due date.
- An overdue incomplete task was visibly marked.
- Overdue was not available as a task status.
- Data remained after the application was stopped and restarted.

## AI Declaration

The preceding document was generated and edited with the assistance of ChatGPT-Web[GPT-5.6 Thinking].
```

Commit and push it:

```powershell
git add docs\CLEAN_CLONE_VERIFICATION.md

git commit `
  -m "docs: record clean clone verification" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"

git push
```

Only record checks that you actually completed successfully.

## Prompt:
8/3/2026, 11:11:43 PM

refive it as markdown don't display the markdown

## Response:
8/3/2026, 11:11:54 PM

Below is the raw Markdown source. Copy each block into the matching file. The documentation covers the required running instructions, database/design references, testing command, and AI declarations. 

### `README.md`

```markdown
# COMS3011A Lab 1 - Local Todo Application

A local-first todo application built with Next.js and SQLite.

The application is intended for a single user running it locally. It does not use user accounts or require an external database server.

## Features

- Create tasks with a title, description, due date, topic, and status.
- Edit existing tasks.
- Archive tasks without deleting their database records.
- View archived tasks.
- Sort active tasks by topic, status, or due date.
- Display overdue tasks without treating overdue as a task status.
- Persist all task information in a local SQLite database.

## Requirements

The project was developed and verified using:

- Node.js `v24.11.0`
- npm

Check the installed Node.js version with:

```bash
node --version
```

## Running It

### 1. Clone the repository

```bash
git clone https://github.com/NadavSundy/2698600-SDPLab1.git
cd 2698600-SDPLab1
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Start the development server

```bash
npm run dev
```

Open the following address in a browser:

```text
http://localhost:3000
```

The SQLite database is created automatically when the application first accesses it.

Stop the server using `Ctrl+C`.

## Running the Automated Tests

Run all automated tests using one command:

```bash
npm test
```

The tests use temporary in-memory SQLite databases. They do not depend on the developer's local database file or its contents.

## Additional Checks

Run ESLint:

```bash
npm run lint
```

Run TypeScript type checking:

```bash
npx tsc --noEmit
```

Create a production build:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Documentation

- [Third-Party Code](docs/THIRD_PARTY_CODE.md)
- [Database Design](docs/DATABASE_DESIGN.md)
- [AI Usage](docs/AI_USAGE.md)
- [Clean Clone Verification](docs/CLEAN_CLONE_VERIFICATION.md)

## Database Storage

The application stores its persistent SQLite database at:

```text
data/todo.db
```

The database file and its SQLite support files are excluded from Git.

A fresh database is automatically created from:

```text
database/schema.sql
```

## AI Usage

This repository makes use of AI code generation using the following tools:

- ChatGPT-Web[GPT-5.6 Thinking]

This repository does not use AI in-line editing tools.

This repository makes use of AI code review using the following tools:

- ChatGPT-Web[GPT-5.6 Thinking]

The full assessment transcript is included in:

```text
docs/transcripts/chatgpt-lab-one-transcript.pdf
```

## AI Declaration

The preceding document was planned, generated, reviewed, and edited with the assistance of ChatGPT-Web[GPT-5.6 Thinking].
```

### `docs/AI_USAGE.md`

```markdown
# AI Usage

## Tools and Models

The following AI tool was used during this assessment:

- **Tool:** ChatGPT Web
- **Model:** GPT-5.6 Thinking
- **Uses:** Project planning, code generation, debugging, code review, test generation, and documentation assistance.

## Usage Approach

AI was used for individual project tasks rather than generating the entire application as a single output.

The work was divided into separate stages:

1. Project setup.
2. SQLite schema and database connection.
3. Task creation and display.
4. Task editing.
5. Task archiving.
6. Task sorting and overdue behaviour.
7. Automated testing.
8. Documentation and submission review.

All generated code was run, inspected, tested, and committed incrementally.

## Corrections and Redirections

During implementation, an initial AI response incorrectly identified the cause of the missing sorting interface.

The project files were then supplied for a full review. The review established that the sorting component, valid sorting types, and repository sorting logic already existed. However, the home page did not render the sorting component or pass the selected sorting option to the repository.

The earlier output was rejected and the AI was redirected to review the actual project files. The home-page integration was then corrected.

Other debugging included:

- Removing duplicate task-repository imports.
- Restoring missing imports for task-status validation.
- Correcting the archived page to call `getArchivedTasks`.
- Correcting the archived-page route.
- Fixing the task-editing page after incorrect code was introduced.
- Renaming the Vitest configuration file to avoid an ESM configuration warning.

## Testing and Verification

The following checks were used during

## Prompt:
8/3/2026, 11:12:20 PM

give me the readme ready to download

## Response:
8/3/2026, 11:12:26 PM

[Download the completed README.md](sandbox:/mnt/data/README.md)

## Prompt:
8/3/2026, 11:13:50 PM

we link to a AI ussage in docs but i don't have that doc

## Response:
8/3/2026, 11:13:56 PM

[Download `AI_USAGE.md`](sandbox:/mnt/data/AI_USAGE.md)

Place it here in your project:

```text
docs/AI_USAGE.md
```

Then commit it:

```powershell
git add docs\AI_USAGE.md

git commit `
  -m "docs: add AI usage record" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"

git push
```

The document records the tool, model, purpose, corrections, and commit attribution required by the course AI policy. `ai_policy.pdf`

Before submission, make sure this transcript file also exists because both the README and AI usage document reference it:

```text
docs/transcripts/chatgpt-lab-one-transcript.pdf
```

## Prompt:
8/3/2026, 11:14:32 PM

i also dont have clean clone verfication

## Response:
8/3/2026, 11:14:40 PM

[Download `CLEAN_CLONE_VERIFICATION.md`](sandbox:/mnt/data/CLEAN_CLONE_VERIFICATION.md)

Place it here:

```text
docs/CLEAN_CLONE_VERIFICATION.md
```

It is a truthful checklist template. Only tick items after you have actually run them, because the lab’s first walkthrough step is performed from a clean clone and the remaining functionality is checked in a fixed order. `lab_one.pdf`

After completing the verification:

```powershell
git add docs\CLEAN_CLONE_VERIFICATION.md

git commit `
  -m "docs: record clean clone verification" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"

git push
```

## Prompt:
8/3/2026, 11:16:34 PM

help me commit everything sice the testing commit

## Response:
8/3/2026, 11:16:36 PM

> **Organizing documentation commits**
>
> I’m grouping the post-testing work into coherent commits: README and technical documentation first, then the AI-use record and transcript, followed by clean-clone verification only after it’s genuinely completed. I’ll inspect status and staged diffs before each commit to avoid placeholders or accidental files.
>
> **Organized documentation commits**
>
> 
>
> **Searched remote repository commits**
>
> 
>
> Worked for 15s

I checked the GitHub repository: its latest remote commit is currently:

```text
3f096d1 test: cover task creation archiving sorting and overdue rules
```

So the documentation work should now be committed as separate, coherent commits. This preserves your history and matches the rubric better than one large documentation dump. `lab_one.pdf`

## 1. Confirm the files are in the correct locations

Your project should contain:

```text
README.md
docs/
├── AI_USAGE.md
├── CLEAN_CLONE_VERIFICATION.md
├── DATABASE_DESIGN.md
├── THIRD_PARTY_CODE.md
└── transcripts/
    └── chatgpt-lab-one-transcript.pdf
```

Check with:

```powershell
git status
Get-ChildItem docs -Recurse
```

Do not commit `CLEAN_CLONE_VERIFICATION.md` as completed if it still contains unchecked boxes, `[enter date]`, or other placeholders.

## 2. Commit the technical documentation

Stage only the README, dependency documentation, and database documentation:

```powershell
git add README.md
git add docs\THIRD_PARTY_CODE.md
git add docs\DATABASE_DESIGN.md
```

Review what is staged:

```powershell
git diff --cached --stat
git diff --cached
```

Commit:

```powershell
git commit `
  -m "docs: document dependencies database design and run commands" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

This commit covers the three required documentation areas: Third-Party Code, Database Design, and Running It. `lab_one.pdf`

## 3. Commit the AI usage documentation

First ensure the transcript exists:

```powershell
Test-Path docs\transcripts\chatgpt-lab-one-transcript.pdf
```

It should return:

```text
True
```

If it returns `False`, create the folder and place your exported, unedited transcript there before continuing:

```powershell
New-Item -ItemType Directory -Path docs\transcripts -Force
```

Then stage the AI documentation and transcript:

```powershell
git add docs\AI_USAGE.md
git add docs\transcripts\chatgpt-lab-one-transcript.pdf
```

Review:

```powershell
git diff --cached --stat
git status
```

Commit:

```powershell
git commit `
  -m "docs: add AI usage record and assessment transcript" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

The course policy requires the tool, model, purpose, code attribution, and assessment transcript to be recorded. `ai_policy.pdf`

## 4. Perform the clean-clone verification

Push the first two documentation commits before testing the clone:

```powershell
git push
```

Move outside your existing repository:

```powershell
cd "C:\Users\nsund\Documents\SDP Labs\Lab 1"
```

Remove an older test clone if one exists:

```powershell
Remove-Item -Recurse -Force "2698600-SDPLab1-clean-test" -ErrorAction SilentlyContinue
```

Clone the GitHub repository:

```powershell
git clone https://github.com/NadavSundy/2698600-SDPLab1.git 2698600-SDPLab1-clean-test
cd 2698600-SDPLab1-clean-test
```

Follow the README commands:

```powershell
node --version
npm ci
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

Then manually verify:

- Create a task with all four information fields.
- Edit it and reload.
- Archive it and find it on the archived page.
- Sort tasks by topic, status, and due date.
- Confirm an incomplete past-due task is marked overdue.
- Confirm Overdue is not a status option.
- Stop and restart the server and confirm the data remains.

The marker will perform the walkthrough from a clean clone in a fixed order, so this check is particularly important. `lab_one.pdf`

## 5. Complete the verification document

Return to the original repository:

```powershell
cd "C:\Users\nsund\Documents\SDP Labs\Lab 1\todo-lab"
```

Open:

```text
docs/CLEAN_CLONE_VERIFICATION.md
```

Replace:

```text
[enter date]
[enter operating system]
[enter notes here]
```

with the real information.

Change only the checks you actually completed from:

```markdown
- [ ]
```

to:

```markdown
- [x]
```

Select the correct final result. If everything passed:

```markdown
- [x] **Passed:** All automated and manual checks completed successfully.
- [ ] **Failed:** One or more checks did not complete successfully.
```

## 6. Commit the clean-clone verification

```powershell
git add docs\CLEAN_CLONE_VERIFICATION.md

git diff --cached
```

Then commit:

```powershell
git commit `
  -m "docs: record successful clean clone verification" `
  -m "Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]"
```

## 7. Final checks and push

Run everything once more in the original repository:

```powershell
npm test
npm run lint
npx tsc --noEmit
git diff --check
git status
```

Push:

```powershell
git push
```

Review the final history:

```powershell
git log --oneline --decorate -12
```

The newest commits should look approximately like:

```text
docs: record successful clean clone verification
docs: add AI usage record and assessment transcript
docs: document dependencies database design and run commands
test: cover task creation archiving sorting and overdue rules
feat: add task sorting and overdue indicators
feat: archive tasks without deleting their records
feat: allow existing tasks to be edited
feat: create tasks and display the active task list
feat: add SQLite schema and database connection
chore: scaffold the local Next.js application
```

Finally:

```powershell
git status
```

Expected:

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)