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