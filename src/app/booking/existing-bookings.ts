import { addDays } from './date-utils';

/** A pre-existing reservation that a new selection is checked against. */
export interface ExistingBooking {
  readonly roomCode: string;
  readonly checkIn: Date;
  readonly checkOut: Date;
}

/**
 * Hardcoded sample bookings for the "room already booked" bonus check,
 * expressed as offsets from `today` rather than fixed calendar dates. A
 * fixed past-relative date (e.g. "2026-09-20") would eventually fall into
 * the past and stop being reachable through the check-in date picker,
 * making the feature untestable whenever this app is actually run.
 */
export function getExistingBookings(today: Date): readonly ExistingBooking[] {
  return [
    { roomCode: 'R101', checkIn: addDays(today, 3), checkOut: addDays(today, 6) },
    { roomCode: 'R201', checkIn: addDays(today, 10), checkOut: addDays(today, 13) },
  ];
}
