# AI Usage

## Tools and Models

The following AI tool was used during this assessment:

- **Tool:** ChatGPT Web
- **Model:** GPT-5.6 Thinking
- **Uses:** Project planning, code generation, debugging, code review, test generation, and documentation assistance.

## Usage Approach

AI was used for individual project tasks rather than to generate the entire application in a single response.

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

The project files were then supplied for a full review. That review established that the sorting component, valid sorting types, and repository sorting logic already existed, but the home page did not render the sorting component or pass the selected sorting option to the repository.

The earlier output was rejected and the AI was redirected to review the actual project files. The home-page integration was then corrected.

Other debugging included:

- Removing duplicate task-repository imports.
- Restoring missing imports for task-status validation.
- Correcting the archived page to call `getArchivedTasks`.
- Correcting the archived-page route.
- Fixing the task-editing page after incorrect code was introduced.
- Renaming the Vitest configuration file to avoid an ESM configuration warning.

## Testing and Verification

The following checks were used during development:

```bash
npm run lint
npx tsc --noEmit
npm test
```

The automated tests use temporary in-memory SQLite databases and cover:

- Task creation.
- Task archiving without deletion.
- Sorting by topic, status, and due date.
- The overdue rule.

## Commit Attribution

Commits containing AI-generated code or documentation include an attribution trailer in the following format:

```text
Assisted-by: ChatGPT-Web[GPT-5.6 Thinking]
```

## Transcript

The full assessment conversation should be saved without editing at:

```text
docs/transcripts/chatgpt-lab-one-transcript.pdf
```

This transcript should include the planning, code generation, debugging, corrections, and final verification steps.

## Responsibility

All AI-assisted output was reviewed and tested before submission. The repository author remains responsible for the submitted work.

## AI Declaration

The preceding document was planned, generated, reviewed, and edited with the assistance of ChatGPT-Web[GPT-5.6 Thinking].
