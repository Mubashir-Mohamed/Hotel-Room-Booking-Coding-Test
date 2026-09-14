# Project Instructions

## Project overview

- Project name: Hotel Room Booking Coding Test
- Product or purpose: A small single-page hotel room booking interface for the Raintech Software Developer coding assessment. Users select check-in/check-out dates and one hotel room, then see validated stay duration and total price.
- Application type: WEB
- Primary technologies: Angular 21, TypeScript, standalone components, Angular Signals where useful, and Angular's built-in forms/testing capabilities.
- Package manager: npm unless the repository already specifies another package manager.
- Runtime versions: Use the version already configured by the repository/environment. Do not invent or upgrade versions without need.
- Repository language: TypeScript.

## Repository structure

Inspect the repository before changing anything. If the repository is empty, keep the structure minimal and conventional for the selected stack.

Important areas will typically include:

| Name | Purpose |
|---|---|
| Application source | UI and booking logic |
| Tests | Unit/behavior tests for critical booking calculations and validation |
| README.md | Setup, run instructions, stack choice, implementation notes and improvements |

## Common commands

Do not invent commands. Inspect `package.json`, lockfiles and framework configuration first.

For an Angular 21 project, prefer the repository's existing scripts. If no custom scripts exist, the expected commands are typically:

```bash
# Install dependencies
npm install

# Start local development
npm start
# or: ng serve

# Build
npm run build
# or: ng build

# Run tests
npm test
# or the test runner configured by the repository

# Run linting, if configured
npm run lint
```

Do not assume these commands without checking `package.json` and the Angular configuration first.

Use the repository's actual scripts and report the exact commands and results.

## General development principles

- Understand the existing implementation before editing.
- Prefer the smallest complete solution that fits the 2–3 hour assessment.
- Keep booking/domain logic separate from presentation logic where practical.
- Use clear, readable, strongly typed code.
- Avoid unnecessary abstractions and premature architecture.
- Avoid unrelated refactoring.
- Do not add dependencies unless they materially improve correctness or testing and are justified.
- Handle invalid user input explicitly; never fail silently.
- Keep the UI clean, usable and responsive enough for normal desktop use.
- Treat the supplied hotel-management screenshots as visual/context references, not as a requirement to reproduce the entire management system.
- Do not implement authentication, payments, persistence, backend APIs or unrelated hotel-management features.

## Coding conventions

- Follow the conventions of the selected framework and existing repository.
- Prefer small focused functions/components.
- Give domain concepts clear names such as room, check-in date, check-out date, nights and total price.
- Avoid duplicated calculation or validation logic.
- Avoid clever date manipulation that is difficult to reason about.
- Handle local-date parsing carefully so timezone conversion does not create off-by-one-day errors.
- Add comments only for non-obvious decisions.

## Angular 21 implementation guidance

- Use Angular 21 with standalone components; do not introduce NgModules unless the existing repository genuinely requires them.
- Prefer Angular Signals for local reactive UI state where they make the implementation clearer.
- Use Angular's modern built-in template control flow (`@if`, `@for`, etc.) where appropriate.
- Keep the booking calculation and validation logic framework-light and deterministic so it can be tested independently from the UI.
- Prefer a small domain/model layer plus focused standalone components rather than a large service/component hierarchy.
- Use Angular dependency injection only where it provides clear value.
- Use Angular's existing form APIs for date/room input validation; do not add a form library.
- Keep the application compatible with Angular 21 conventions and the TypeScript version selected by the Angular 21 project.
- Do not introduce Nx unless the repository already uses Nx or the task explicitly requires it.

## Architecture rules

- Keep core booking calculations deterministic and easy to test.
- Keep room sample data in a small, obvious location.
- Keep validation rules explicit and reusable.
- Do not introduce a backend or database.
- Do not create global state unless the chosen framework genuinely benefits from it.
- Keep UI concerns separate from calculation/validation logic where practical.
- Avoid circular dependencies and unnecessary module layers.

## Functional requirements

The application must:

1. Display the five supplied sample rooms:
   - R101 — Deluxe Room — ₹3,500/night — max 2 guests
   - R102 — Deluxe Room — ₹3,500/night — max 2 guests
   - R201 — Executive Suite — ₹5,800/night — max 3 guests
   - R202 — Executive Suite — ₹5,800/night — max 3 guests
   - R301 — Family Room — ₹4,200/night — max 4 guests
2. Allow the user to select a check-in date.
3. Allow the user to select a check-out date.
4. Allow the user to select exactly one room.
5. Once a valid date range and room are selected, display:
   - number of nights
   - total price = nights × room price/night
6. Validate:
   - check-in cannot be in the past
   - check-out must be after check-in
   - invalid/missing room selection must produce a clear message
   - invalid date input must produce a clear message rather than silently failing
7. Handle the same-day case explicitly. It is invalid because check-out must be after check-in.
8. Avoid timezone-related date calculation errors.

## Optional bonus requirements

Only implement these after the core requirements are complete and verified:

- Prevent selecting a room that is already booked for the chosen dates using a small hardcoded set of sample bookings.
- Add a basic unit test for night/price calculation.
- Filter rooms by maximum guest count.

Do not let bonus work compromise core correctness, readability or the assessment time limit.

## Testing expectations

At minimum, verify the critical logic for:

- valid one-night stay
- multi-night stay
- same-day check-in/check-out rejection
- check-out before check-in rejection
- past check-in rejection
- no room selected
- total price calculation
- edge cases around dates without timezone/off-by-one errors

If the chosen stack has a lightweight unit-test setup, add focused tests for the calculation/validation logic. Do not spend excessive time building a large test suite.

## Security and data handling

- No authentication or sensitive data is required.
- Do not commit secrets or environment credentials.
- Do not add unnecessary external services.
- Sample hotel data may be hardcoded as explicitly permitted by the assessment.

## Configuration and environment

- Respect existing repository configuration.
- Do not upgrade framework/runtime versions just for preference.
- If starting from an empty repository, choose the simplest stable setup that can be completed and verified within the assessment scope.
- Document the chosen stack in README.md.

## Git rules

The assessment explicitly asks for a few logical commits so the reviewer can see the development process.

Before making changes:

1. Inspect Git status.
2. Inspect the current branch.
3. Identify any existing uncommitted changes.

Rules:

- Do not discard existing user changes.
- Do not reset, clean or revert unrelated files.
- Do not use destructive Git commands.
- Keep commits logical and focused.
- When the implementation is ready, use a small number of meaningful commits if the user asks Claude to commit.
- Never claim a commit was made unless the command succeeded.

A reasonable commit progression is:
1. scaffold/project setup
2. booking UI and core logic
3. validation/tests/README and final polish

## Change workflow

For every session:

1. Read `CLAUDE.md` and `HANDOFF.md`.
2. Inspect Git status and branch.
3. Inspect the relevant source/configuration/tests.
4. Summarize the current objective and state.
5. Create a concise plan before non-trivial changes.
6. Implement the smallest complete change.
7. Run focused validation first, then broader checks where practical.
8. Review the final diff.
9. Update `HANDOFF.md`.
10. Report exactly what changed and what was verified.

## Definition of done

The assessment is complete when:

- All core booking requirements work.
- Date validation is correct, including same-day, reversed and past-date cases.
- Night count and total price are correct.
- The five sample rooms are displayed with the supplied prices and capacities.
- The UI clearly communicates errors.
- Relevant tests/checks have been run and their results are known.
- README contains setup/run instructions, selected stack and improvements that could be made with more time.
- The implementation remains small and readable.
- No unrelated functionality has been added.
- The final Git diff has been reviewed.
- `HANDOFF.md` accurately describes the final state and any remaining risks.

## Communication style

When responding:

- Start with a short understanding of the task.
- State important assumptions, especially when the repository is empty.
- Explain the plan before broad or risky changes.
- Keep progress updates concise and practical.
- Do not claim something works unless it was verified.
- At the end, report:
  - what changed;
  - why it changed;
  - files changed;
  - checks run and results;
  - remaining issues;
  - recommended next action.
