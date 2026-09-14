# Session Handoff

## Task

- Name: Raintech Hotel Booking Coding Test
- Status: NOT_STARTED
- Date: 2026-09-14
- Branch: [INSPECT_REPOSITORY]

## Objective

Build and submit a small single-page hotel room booking application for the Raintech Software Developer coding assessment. The app must let a user choose check-in/check-out dates and one room, validate the dates/selection, and calculate nights and total price correctly.

## Context

Raintech Software Limited requested a short practical coding exercise for the Software Developer application. The assessment states a 2–3 hour time limit and emphasizes problem-solving, code structure, correctness and readability over feature volume.

The task requires a single page with:
- the supplied five-room sample data;
- check-in and check-out date selection;
- one room selection;
- nights and total price calculation;
- validation for past check-in, invalid date ranges and invalid room/date selections;
- clear error messages.

The supplied screenshots show a broader hotel-management product, including dashboard, guest check-in and guest check-out screens. They should be treated as visual/context references only; the coding test does not require reproducing those screens or their unrelated hotel-management functionality.

The assessment explicitly says no backend/database is required, any comfortable front-end language/framework may be used, and the README must explain how to run the project, the selected stack, and what could be improved with more time.

The email asks for the solution to be pushed to a public GitHub/GitLab repository and submitted by replying with the repository link. It also asks for submission within 3 days of receiving the email.

## Current state

- Repository state: UNKNOWN — inspect first.
- Required frontend stack: Angular 21 + TypeScript.
- Implementation: Not started.
- Tests: Not started.
- README: Not started.
- Git history: Inspect before editing.

## Completed work

- Reviewed the supplied assessment requirements and supporting screenshots.
- Prepared project-specific Claude instructions and session workflow.
- No application code has been implemented yet.

## Current work

- Inspect the repository and determine whether a project already exists or whether a minimal application must be scaffolded.
- Confirm the available runtime, package manager and existing scripts.
- Implement only the assessment scope.

## Next action

Read `CLAUDE.md`, inspect `git status` and the current branch, inspect the repository structure/configuration, then summarize the current state before proposing the implementation plan.

## Relevant files

- `CLAUDE.md` — project-specific development rules and acceptance criteria.
- `HANDOFF.md` — cross-session state and next action.
- `README.md` — required setup, stack and improvement notes.
- Application source — booking UI, room data, date validation and calculations.
- Test files — focused tests for date/night/price behavior where supported.

## Requirements

- Display R101, R102, R201, R202 and R301 with the exact supplied room types, prices and max guests.
- Select check-in and check-out dates.
- Select one room.
- Show number of nights and total price when the selection is valid.
- Reject past check-in dates.
- Reject check-out dates that are the same as or earlier than check-in.
- Show clear validation messages.
- Avoid silent failure and timezone/off-by-one date errors.
- Include README setup/run instructions, chosen stack and future improvements.
- Push the final code to a public GitHub/GitLab repository when ready.
- Use a few logical Git commits so the development process is visible.

## Constraints

- Time-box the implementation to the requested 2–3 hour assessment scope.
- No backend, database, authentication, payments or booking persistence.
- No unnecessary dependencies or architecture.
- Do not reproduce the full hotel-management dashboard shown in the reference images.
- Do not modify unrelated repository code.
- Do not discard existing uncommitted changes.
- Bonus features are lower priority than core correctness.

## Decisions made

- Treat the assessment document as the source of truth for functionality.
- Use Angular 21 + TypeScript as the fixed implementation stack.
- Treat the three supplied hotel-management screenshots as visual/context references, not as feature requirements.
- Keep the application intentionally small and focused on booking selection, validation and calculation.
- Prefer deterministic, testable date/price logic.

## Open questions

- Is the repository already configured as an Angular 21 application, and which npm scripts/package manager configuration does it use?
- Is the repository empty or does it contain a starter project?
- What Node.js/TypeScript versions and Angular 21 configuration are available/configured?

## Known issues or blockers

- None known before repository inspection.

## Errors

```text
No implementation errors yet.
```

## Verification

| Check | Command | Result |
|---|---|---|
| Tests | `[INSPECT_REPOSITORY]` | NOT RUN |
| Lint | `[INSPECT_REPOSITORY]` | NOT RUN |
| Build | `[INSPECT_REPOSITORY]` | NOT RUN |
| Type check | `[INSPECT_REPOSITORY]` | NOT RUN |

## Git state

```text
Not yet inspected.
```

## Uncommitted changes

- Not yet inspected.

## Next-session instruction

Read `CLAUDE.md` and this `HANDOFF.md` first. Then inspect Git status/branch and repository configuration before editing. Do not assume a framework or project structure until the repository confirms it.

## Last updated

2026-09-14 22:31 IST
