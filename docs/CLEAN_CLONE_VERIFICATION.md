# Clean Clone Verification

This document records verification of the repository from a fresh clone.


## Verification Environment

- **Repository:** `https://github.com/NadavSundy/2698600-SDPLab1.git`
- **Node.js version:** `v24.11.0`
- **Package manager:** npm
- **Verification date:** `03/08/2026`
- **Operating system:** `Windows 11`

## Clean Clone Commands

The repository was cloned into a new directory and the following commands were run from the repository root:

```bash
git clone https://github.com/NadavSundy/2698600-SDPLab1.git 2698600-SDPLab1-clean-test
cd 2698600-SDPLab1-clean-test
npm ci
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

## Automated Verification Results

Replace the unchecked boxes after each command succeeds.

- [x] `npm ci` completed successfully.
- [x] `npm test` completed successfully.
- [x] All automated tests passed.
- [x] `npm run lint` completed without errors.
- [x] `npx tsc --noEmit` completed without type errors.
- [x] `npm run build` completed successfully.
- [x] `npm run dev` started the application successfully.
- [x] The application opened at `http://localhost:3000`.

## Functional Walkthrough

Replace the unchecked boxes only after manually verifying each behaviour.

- [x] A task can be created with a title, description, due date, and topic.
- [x] The created task appears in the active task list.
- [x] An existing task can be edited.
- [x] The edited values remain after reloading the page.
- [x] A task can be archived.
- [x] The archived task leaves the active task list.
- [x] The archived task remains visible on the archived-tasks page.
- [x] Active tasks can be sorted by topic.
- [x] Active tasks can be sorted by status.
- [x] Active tasks can be sorted by due date.
- [x] An incomplete task with a past due date is visibly marked as overdue.
- [x] Overdue is not available as a selectable task status.
- [x] Task data remains after stopping and restarting the application.

## Final Result

Choose one result after completing the verification:

- [x] **Passed:** All automated and manual checks completed successfully.
- [ ] **Failed:** One or more checks did not complete successfully.



## AI Declaration

The preceding document was planned, generated, reviewed, and edited with the assistance of ChatGPT-Web[GPT-5.6 Thinking].
