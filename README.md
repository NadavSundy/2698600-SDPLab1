# COMS3011A Lab 1 — Local Todo Application

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

``bash
node --version
`

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
