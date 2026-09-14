import { describe, expect, it } from 'vitest';
import { ROOMS } from '../models/room.model';
import { validateBooking } from './booking-validation';

// Fixed reference "today" so past/future date checks are deterministic
// regardless of when the test suite runs.
const TODAY = new Date(2026, 4, 15); // 15 May 2026

const R101 = ROOMS.find((room) => room.code === 'R101')!;

describe('validateBooking', () => {
  it('produces a quote for a valid one-night stay', () => {
    const result = validateBooking(
      { checkIn: '2026-05-16', checkOut: '2026-05-17', roomCode: 'R101' },
      ROOMS,
      TODAY,
    );

    expect(result.errors).toEqual([]);
    expect(result.quote).toEqual({ room: R101, nights: 1, totalPrice: 3500 });
  });

  it('produces a quote for a valid multi-night stay and calculates total price correctly', () => {
    const result = validateBooking(
      { checkIn: '2026-05-16', checkOut: '2026-05-19', roomCode: 'R201' },
      ROOMS,
      TODAY,
    );

    const room = ROOMS.find((r) => r.code === 'R201')!;
    expect(result.errors).toEqual([]);
    expect(result.quote).toEqual({ room, nights: 3, totalPrice: 3 * room.pricePerNight });
  });

  it('rejects a same-day check-in/check-out', () => {
    const result = validateBooking(
      { checkIn: '2026-05-16', checkOut: '2026-05-16', roomCode: 'R101' },
      ROOMS,
      TODAY,
    );

    expect(result.quote).toBeNull();
    expect(result.errors).toContain('Check-out date must be after check-in date.');
  });

  it('rejects a check-out date before check-in', () => {
    const result = validateBooking(
      { checkIn: '2026-05-20', checkOut: '2026-05-18', roomCode: 'R101' },
      ROOMS,
      TODAY,
    );

    expect(result.quote).toBeNull();
    expect(result.errors).toContain('Check-out date must be after check-in date.');
  });

  it('rejects a check-in date in the past', () => {
    const result = validateBooking(
      { checkIn: '2026-05-14', checkOut: '2026-05-16', roomCode: 'R101' },
      ROOMS,
      TODAY,
    );

    expect(result.quote).toBeNull();
    expect(result.errors).toContain('Check-in date cannot be in the past.');
  });

  it('allows check-in on today itself (today is not "in the past")', () => {
    const result = validateBooking(
      { checkIn: '2026-05-15', checkOut: '2026-05-16', roomCode: 'R101' },
      ROOMS,
      TODAY,
    );

    expect(result.errors).toEqual([]);
    expect(result.quote?.nights).toBe(1);
  });

  it('requires a room to be selected', () => {
    const result = validateBooking(
      { checkIn: '2026-05-16', checkOut: '2026-05-17', roomCode: null },
      ROOMS,
      TODAY,
    );

    expect(result.quote).toBeNull();
    expect(result.errors).toContain('Please select a room.');
  });

  it('rejects an unrecognized room code', () => {
    const result = validateBooking(
      { checkIn: '2026-05-16', checkOut: '2026-05-17', roomCode: 'R999' },
      ROOMS,
      TODAY,
    );

    expect(result.quote).toBeNull();
    expect(result.errors).toContain('Selected room is not recognized.');
  });

  it('requires both check-in and check-out dates', () => {
    const result = validateBooking(
      { checkIn: null, checkOut: null, roomCode: 'R101' },
      ROOMS,
      TODAY,
    );

    expect(result.quote).toBeNull();
    expect(result.errors).toContain('Please select a check-in date.');
    expect(result.errors).toContain('Please select a check-out date.');
  });

  it('reports an invalid date string clearly instead of failing silently', () => {
    const result = validateBooking(
      { checkIn: 'not-a-date', checkOut: '2026-05-17', roomCode: 'R101' },
      ROOMS,
      TODAY,
    );

    expect(result.quote).toBeNull();
    expect(result.errors).toContain('Check-in date is invalid.');
  });

  it('calculates nights and total price correctly across a month boundary (timezone/off-by-one edge case)', () => {
    const result = validateBooking(
      { checkIn: '2026-05-30', checkOut: '2026-06-02', roomCode: 'R301' },
      ROOMS,
      TODAY,
    );

    const room = ROOMS.find((r) => r.code === 'R301')!;
    expect(result.errors).toEqual([]);
    expect(result.quote).toEqual({ room, nights: 3, totalPrice: 3 * room.pricePerNight });
  });

  it('reports multiple errors at once rather than only the first', () => {
    const result = validateBooking({ checkIn: null, checkOut: null, roomCode: null }, ROOMS, TODAY);

    expect(result.errors.length).toBeGreaterThan(1);
  });
});
