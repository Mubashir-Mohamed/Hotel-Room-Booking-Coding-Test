## Task

Build the Raintech Software Limited Hotel Room Booking coding-test application as a small, production-quality-for-the-scope Angular 21 + TypeScript single-page front-end.

### Desired outcome

A user should be able to open the application, view the available sample hotel rooms, choose a check-in date, choose a check-out date and select one room. When the inputs are valid, the UI should clearly show the number of nights and the total price. Invalid dates or room selection should produce clear, user-facing validation feedback.

### Required room data

| Room Code | Room Type | Price / Night | Max Guests |
|---|---|---:|---:|
| R101 | Deluxe Room | ₹3,500 | 2 |
| R102 | Deluxe Room | ₹3,500 | 2 |
| R201 | Executive Suite | ₹5,800 | 3 |
| R202 | Executive Suite | ₹5,800 | 3 |
| R301 | Family Room | ₹4,200 | 4 |

### Required behavior

- Display all five sample rooms.
- Allow check-in date selection.
- Allow check-out date selection.
- Allow exactly one room to be selected.
- Calculate nights as the calendar-day difference between check-out and check-in.
- Calculate total as `nights × pricePerNight`.
- Reject check-in dates in the past.
- Reject check-out dates equal to or earlier than check-in.
- Treat same-day check-in/check-out as invalid.
- Clearly explain validation errors instead of failing silently.
- Ensure date handling is not vulnerable to timezone/off-by-one-day errors.

### Scope

This is a 2–3 hour coding assessment. Optimize for:
1. correctness;
2. clear code structure;
3. readable implementation;
4. focused validation/testing;
5. a clean, usable UI.

Do NOT implement:
- backend/API;
- database;
- authentication;
- payments;
- booking persistence;
- full hotel-management dashboard;
- unrelated hotel operations.

The three supplied screenshots are references for the general hotel-management visual context only. They are not a specification for additional features.

### Technical direction

- Framework: Angular 21.x.
- Language: TypeScript.
- Prefer standalone Angular components.
- Prefer Angular Signals for simple local reactive state where appropriate.
- Prefer Angular's modern built-in template control flow (`@if`, `@for`, etc.).
- Use Angular's built-in forms/validation APIs; do not add a form library.
- Keep calculation and validation logic deterministic and easy to unit test.
- Do not introduce NgModules, Nx, state-management libraries or UI component libraries unless the existing repository already uses them.

1. Inspect the repository first.
2. Reuse an existing project/stack if present.
3. If the repository is empty, scaffold a minimal Angular 21 application and document the Angular/TypeScript setup in README.
4. Avoid adding dependencies unless they are genuinely necessary; prefer Angular 21 and its built-in capabilities.
5. Keep booking calculations and validation logic deterministic and easy to test.
6. Keep the UI simple and usable rather than spending the assessment time on visual polish.

### Validation/testing

At minimum, verify:
- valid one-night stay;
- valid multi-night stay;
- same-day dates;
- reversed dates;
- past check-in;
- missing room;
- correct total price;
- date edge cases that could expose timezone problems.

Use focused unit tests for core calculation/validation logic if the project setup supports them without disproportionate setup effort.

### Optional bonus

Only after all core requirements are complete and verified:
- hardcode a couple of existing bookings and prevent overlapping room selection;
- add a basic night/price unit test if not already present;
- filter rooms by max guests.

Do not sacrifice core requirements for bonus features.

### README

Include:
- how to install dependencies;
- how to run the app;
- how to run tests/checks;
- chosen framework/stack;
- brief implementation notes;
- what you would improve with more time.

### Git

The assessment asks for a few logical commits so the reviewer can see the process. Keep commits small and meaningful if commits are being made. Do not use destructive Git operations.

### Definition of done

The application works end-to-end for the core scenario, invalid inputs are handled clearly, calculations are correct, relevant checks have been run, README is complete, and the final diff contains no unrelated changes.
