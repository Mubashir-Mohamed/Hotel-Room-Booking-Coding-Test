import { describe, expect, it } from 'vitest';
import {
  addDays,
  calculateNights,
  parseLocalDate,
  rangesOverlap,
  startOfDay,
  toIsoDateString,
} from './date-utils';

describe('parseLocalDate', () => {
  it('parses a valid ISO date string as a local date', () => {
    const date = parseLocalDate('2026-05-10');
    expect(date).not.toBeNull();
    expect(date?.getFullYear()).toBe(2026);
    expect(date?.getMonth()).toBe(4); // 0-indexed: May
    expect(date?.getDate()).toBe(10);
  });

  it('returns null for null/undefined/empty input', () => {
    expect(parseLocalDate(null)).toBeNull();
    expect(parseLocalDate(undefined)).toBeNull();
    expect(parseLocalDate('')).toBeNull();
  });

  it('returns null for malformed strings', () => {
    expect(parseLocalDate('not-a-date')).toBeNull();
    expect(parseLocalDate('2026/05/10')).toBeNull();
    expect(parseLocalDate('10-05-2026')).toBeNull();
  });

  it('returns null for a date that overflows into another month (e.g. Feb 30)', () => {
    expect(parseLocalDate('2026-02-30')).toBeNull();
  });

  it('does not shift the day when the string is parsed (no UTC/local off-by-one)', () => {
    // A naive `new Date('2026-01-01')` parses as UTC midnight, which in any
    // timezone behind UTC reads back as December 31 on `.getDate()`.
    const date = parseLocalDate('2026-01-01');
    expect(date?.getFullYear()).toBe(2026);
    expect(date?.getMonth()).toBe(0);
    expect(date?.getDate()).toBe(1);
  });
});

describe('toIsoDateString', () => {
  it('formats a Date back into the same YYYY-MM-DD string', () => {
    expect(toIsoDateString(new Date(2026, 4, 10))).toBe('2026-05-10');
  });

  it('pads single-digit months and days', () => {
    expect(toIsoDateString(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});

describe('startOfDay', () => {
  it('strips any time-of-day component', () => {
    const withTime = new Date(2026, 4, 10, 23, 59, 59);
    const stripped = startOfDay(withTime);
    expect(stripped.getHours()).toBe(0);
    expect(stripped.getMinutes()).toBe(0);
    expect(stripped.getSeconds()).toBe(0);
  });
});

describe('addDays', () => {
  it('adds days within the same month', () => {
    expect(toIsoDateString(addDays(new Date(2026, 4, 10), 3))).toBe('2026-05-13');
  });

  it('rolls over a month boundary', () => {
    expect(toIsoDateString(addDays(new Date(2026, 4, 30), 3))).toBe('2026-06-02');
  });

  it('rolls over a year boundary', () => {
    expect(toIsoDateString(addDays(new Date(2026, 11, 30), 3))).toBe('2027-01-02');
  });
});

describe('calculateNights', () => {
  it('calculates a single night', () => {
    const checkIn = parseLocalDate('2026-05-10')!;
    const checkOut = parseLocalDate('2026-05-11')!;
    expect(calculateNights(checkIn, checkOut)).toBe(1);
  });

  it('calculates multiple nights', () => {
    const checkIn = parseLocalDate('2026-05-10')!;
    const checkOut = parseLocalDate('2026-05-13')!;
    expect(calculateNights(checkIn, checkOut)).toBe(3);
  });

  it('returns 0 for the same day (not a valid booking, but arithmetically zero)', () => {
    const checkIn = parseLocalDate('2026-05-10')!;
    expect(calculateNights(checkIn, checkIn)).toBe(0);
  });

  it('is correct across a month boundary', () => {
    const checkIn = parseLocalDate('2026-05-30')!;
    const checkOut = parseLocalDate('2026-06-02')!;
    expect(calculateNights(checkIn, checkOut)).toBe(3);
  });
});

describe('rangesOverlap', () => {
  it('detects an overlap when one range starts inside the other', () => {
    const a = [parseLocalDate('2026-05-10')!, parseLocalDate('2026-05-15')!] as const;
    const b = [parseLocalDate('2026-05-12')!, parseLocalDate('2026-05-18')!] as const;
    expect(rangesOverlap(...a, ...b)).toBe(true);
  });

  it('detects an overlap when one range fully contains the other', () => {
    const a = [parseLocalDate('2026-05-10')!, parseLocalDate('2026-05-20')!] as const;
    const b = [parseLocalDate('2026-05-12')!, parseLocalDate('2026-05-14')!] as const;
    expect(rangesOverlap(...a, ...b)).toBe(true);
  });

  it('does not treat back-to-back stays as overlapping (checkout day is exclusive)', () => {
    const a = [parseLocalDate('2026-05-10')!, parseLocalDate('2026-05-15')!] as const;
    const b = [parseLocalDate('2026-05-15')!, parseLocalDate('2026-05-18')!] as const;
    expect(rangesOverlap(...a, ...b)).toBe(false);
  });

  it('does not treat separated ranges as overlapping', () => {
    const a = [parseLocalDate('2026-05-10')!, parseLocalDate('2026-05-12')!] as const;
    const b = [parseLocalDate('2026-05-20')!, parseLocalDate('2026-05-22')!] as const;
    expect(rangesOverlap(...a, ...b)).toBe(false);
  });
});
