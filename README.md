# Hotel Room Booking

A focused **Angular 21 + TypeScript** single-page hotel room booking application created for the **Raintech Software Limited Developer Skills Assessment**.

The assessment is intentionally scoped to a 2–3 hour exercise. The solution focuses on correctness, readable code, validation, date/night calculation, price calculation, and a clean user experience.

## Features

- Display the five supplied hotel rooms.
- Select check-in and check-out dates.
- Select one room.
- Calculate number of nights.
- Calculate total price.
- Prevent past check-in dates.
- Reject same-day or reversed date ranges.
- Display clear validation messages.
- Handle calendar dates without timezone/off-by-one calculation issues.
- Prevent selecting a room already booked for the chosen dates (bonus).
- Filter the room list by minimum guest count (bonus).

## Room Data

| Room Code | Room Type | Price / Night | Max Guests |
|---|---|---:|---:|
| R101 | Deluxe Room | ₹3,500 | 2 |
| R102 | Deluxe Room | ₹3,500 | 2 |
| R201 | Executive Suite | ₹5,800 | 3 |
| R202 | Executive Suite | ₹5,800 | 3 |
| R301 | Family Room | ₹4,200 | 4 |

The room data is hardcoded as permitted by the assessment.

## Tech Stack

- **Angular 21.x**
- **TypeScript**
- **HTML / CSS**
- **npm**
- Angular CLI
- Angular's standalone component architecture
- Angular Signals where useful for local reactive state
- Angular's built-in forms/validation capabilities

No backend, database, authentication, payment system, or persistence is required.

## Prerequisites

- Node.js compatible with the Angular 21 project
- npm
- Git

Check your environment:

```bash
node --version
npm --version
```

The versions defined in `package.json` and the project's Angular configuration are the source of truth.

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

If the repository does not define `npm start`, use:

```bash
ng serve
```

Then open the local URL displayed by Angular CLI.

## Build

```bash
npm run build
```

If no build script is configured:

```bash
ng build
```

## Tests

Run the repository's configured test command:

```bash
npm test
```

Core behavior should cover:

- Valid one-night booking.
- Valid multi-night booking.
- Same-day dates.
- Check-out before check-in.
- Past check-in.
- Missing room selection.
- Correct nights calculation.
- Correct total-price calculation.
- Date edge cases that could expose timezone errors.

## Booking Calculation

For a valid selection:

```text
nights = check-out date - check-in date
total = nights × price per night
```

Example:

```text
Room: R101
Rate: ₹3,500/night
Check-in: 10 May
Check-out: 13 May

Nights: 3
Total: ₹10,500
```

The check-out date is not counted as a night.

## Validation Rules

1. Check-in date is required.
2. Check-out date is required.
3. Check-in cannot be in the past.
4. Check-out must be after check-in.
5. Same-day check-in/check-out is invalid.
6. A room must be selected.
7. Invalid input must produce a clear user-facing message.
8. A room already booked (against the hardcoded sample bookings) for the chosen dates cannot be selected.

## Bonus Features

### Room availability against existing bookings
A small hardcoded set of sample bookings (`src/app/booking/existing-bookings.ts`) is checked against the selected room and date range. A conflicting room's radio button is disabled in the UI with a "Booked for these dates" note, and `validateBooking()` independently rejects the same conflict as a defense-in-depth check. The sample bookings are expressed as offsets from "today" (e.g. today + 3 days) rather than fixed calendar dates, so the feature stays demonstrable no matter when the app is run — a fixed date would eventually fall into the past and become unreachable through the check-in date picker. Back-to-back stays (one check-out date equal to another booking's check-in date) are correctly treated as non-overlapping.

### Filter rooms by guest count
A "Guests" dropdown above the room list (Any, 1+, 2+, 3+, 4+) filters the visible rooms to those with `maxGuests` at or above the selected value. If the currently selected room is filtered out of view, the selection is cleared so a hidden room can't remain silently selected.

## Project Structure

```text
src/
└── app/
    ├── app.ts / app.html / app.css   # The single booking page (UI + local state)
    ├── models/
    │   └── room.model.ts             # Hardcoded sample room data
    └── booking/
        ├── date-utils.ts             # Pure date helpers (parsing, night count, range overlap)
        ├── existing-bookings.ts      # Hardcoded sample bookings for the availability check
        └── booking-validation.ts     # Framework-free validation + pricing

*.spec.ts files sit next to the source file they test.
```

Keep the implementation small and avoid unnecessary abstractions.

## Design Principles

### Correctness
Date validation, night calculation, and price calculation are the core business logic.

### Readability
Prefer clear names, focused components, simple functions, and straightforward control flow.

### Testability
Keep calculation and validation logic deterministic and easy to test independently from the UI.

### Angular 21
Prefer standalone components, modern Angular control flow such as `@if` / `@for`, and Signals where they improve clarity.

## Visual Design

The assessment's supplied hotel-management screenshots (main dashboard, guest check-in, guest check-out) are explicitly scoped as visual/context references only — not a specification to reproduce. This app stays a single booking page, but borrows the reference's visual language:

- A branded top bar ("RH" mark + "Raintech Hotel" wordmark).
- Navy section-header bars on card containers, echoing the reference dashboard's card/header style.
- Warm amber room-code badges, similar to the reference's room-number chips.
- A navy highlight for the selected room and a teal accent header on the booking summary.
- A light-gray page background behind white cards, matching the dashboard's card-on-gray layout.

No functionality from the reference screens (search, notifications, multi-step wizards, room-status floor view, etc.) was added — only the color palette, typography treatment and card styling.

## Out of Scope

The following are deliberately excluded:

- Backend/API
- Database
- Authentication
- Payments
- Booking persistence
- User accounts
- Full hotel-management dashboard
- Guest check-in/check-out management
- Housekeeping
- Restaurant management
- Staff management
- WhatsApp integration

The supplied hotel-management screenshots are **visual/context references only**, not a requirement to reproduce the complete hotel-management system.

## Optional Enhancements

The assessment lists these as bonus features:

- Prevent selecting a room already booked for the chosen dates. ✅ Implemented.
- Add a basic unit test for night/price calculation. ✅ Implemented (part of the core test suite).
- Filter rooms by maximum guests. ✅ Implemented.

## Git Workflow

The assessment asks for a few logical commits so the development process can be reviewed.

A possible progression:

```text
1. Project setup / Angular 21 scaffold
2. Implement room booking UI and calculations
3. Add validation and tests
4. README and final polish
```

Keep commits focused and avoid destructive Git operations.

## What I Would Improve With More Time

- Broader unit/component test coverage.
- End-to-end tests for the booking flow.
- Improved accessibility and keyboard navigation.
- More responsive/mobile refinement.
- Backend/API integration and booking persistence.
- CI checks for linting, testing, and production builds.

These are intentionally outside the core 2–3 hour assessment scope.

## Assessment Reference

This project implements the **Raintech Software Limited – Developer Skills Assessment: Hotel Room Booking**.

The assessment evaluates:

- Date/night/price calculation correctness.
- Code structure and readability.
- Validation and error handling.
- Git usage and logical commits.

The final submission should be pushed to a public GitHub/GitLab repository and the repository link shared with Raintech.
