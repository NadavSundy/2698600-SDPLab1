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

The Node.js version can be checked with:

```bash
node --version