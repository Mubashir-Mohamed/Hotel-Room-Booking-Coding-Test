import type { Room } from '../models/room.model';
import { calculateNights, parseLocalDate, rangesOverlap, startOfDay } from './date-utils';
import type { ExistingBooking } from './existing-bookings';

/** Raw form input, as strings straight from the UI (or null when unset). */
export interface BookingInput {
  readonly checkIn: string | null;
  readonly checkOut: string | null;
  readonly roomCode: string | null;
}

/** The priced result of a valid booking selection. */
export interface BookingQuote {
  readonly room: Room;
  readonly nights: number;
  readonly totalPrice: number;
}

export interface BookingValidationResult {
  readonly errors: readonly string[];
  /** Present only when there are no validation errors. */
  readonly quote: BookingQuote | null;
}

/**
 * Validates a booking selection and, when valid, calculates nights and
 * total price. Deliberately framework-free so it can be unit tested without
 * Angular's TestBed.
 *
 * @param today Defaults to the real current date; pass an explicit value in
 *   tests to make "check-in cannot be in the past" deterministic.
 * @param bookings Existing reservations to check the new selection against;
 *   defaults to none.
 */
export function validateBooking(
  input: BookingInput,
  rooms: readonly Room[],
  today: Date = new Date(),
  bookings: readonly ExistingBooking[] = [],
): BookingValidationResult {
  const errors: string[] = [];

  const room = input.roomCode
    ? rooms.find((candidate) => candidate.code === input.roomCode)
    : undefined;
  if (!input.roomCode) {
    errors.push('Please select a room.');
  } else if (!room) {
    errors.push('Selected room is not recognized.');
  }

  const checkIn = input.checkIn ? parseLocalDate(input.checkIn) : null;
  if (!input.checkIn) {
    errors.push('Please select a check-in date.');
  } else if (!checkIn) {
    errors.push('Check-in date is invalid.');
  }

  const checkOut = input.checkOut ? parseLocalDate(input.checkOut) : null;
  if (!input.checkOut) {
    errors.push('Please select a check-out date.');
  } else if (!checkOut) {
    errors.push('Check-out date is invalid.');
  }

  if (checkIn && checkIn.getTime() < startOfDay(today).getTime()) {
    errors.push('Check-in date cannot be in the past.');
  }

  // Same-day check-in/check-out falls out of this check naturally, since
  // check-out equal to check-in is not strictly after it.
  if (checkIn && checkOut && checkOut.getTime() <= checkIn.getTime()) {
    errors.push('Check-out date must be after check-in date.');
  }

  // Only meaningful once the room and date range are each individually
  // valid, so this doesn't stack a confusing second error on top of one
  // already reported above.
  if (room && checkIn && checkOut && checkOut.getTime() > checkIn.getTime()) {
    const isBooked = bookings.some(
      (booking) =>
        booking.roomCode === room.code &&
        rangesOverlap(checkIn, checkOut, booking.checkIn, booking.checkOut),
    );
    if (isBooked) {
      errors.push('Selected room is already booked for the chosen dates.');
    }
  }

  if (errors.length > 0 || !room || !checkIn || !checkOut) {
    return { errors, quote: null };
  }

  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = nights * room.pricePerNight;
  return { errors: [], quote: { room, nights, totalPrice } };
}
