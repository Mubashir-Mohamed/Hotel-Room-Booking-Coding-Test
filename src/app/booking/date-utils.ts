/**
 * Date helpers used by the booking calculations.
 *
 * All dates here are treated as calendar dates with no time-of-day meaning.
 * The tricky part is that `<input type="date">` produces a "YYYY-MM-DD"
 * string, and `new Date('YYYY-MM-DD')` parses that as UTC midnight rather
 * than local midnight — in a timezone behind UTC that shifts the date back
 * by a day once it's read back with local getters. Building the Date from
 * numeric year/month/day components instead avoids that conversion.
 */

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Parses a "YYYY-MM-DD" string into a local-midnight Date, or null if invalid. */
export function parseLocalDate(value: string | null | undefined): Date | null {
  if (!value || !ISO_DATE_PATTERN.test(value)) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  // Rejects overflow such as 2026-02-30, which Date would otherwise silently
  // roll into March.
  const isSameCalendarDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

  return isSameCalendarDate ? date : null;
}

/** Formats a Date as the "YYYY-MM-DD" string an `<input type="date">` expects. */
export function toIsoDateString(date: Date): string {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Strips any time component, returning a Date at local midnight. */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Adds a whole number of calendar days to a local-midnight Date. */
export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/**
 * Number of nights between two local-midnight dates. Rounding guards
 * against a Daylight Saving Time transition between the two dates shifting
 * the raw millisecond difference away from a whole number of days.
 */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  return Math.round((checkOut.getTime() - checkIn.getTime()) / MS_PER_DAY);
}

/**
 * True when stay [aStart, aEnd) overlaps stay [bStart, bEnd). Each end date
 * is exclusive (the checkout day itself is not an occupied night), so a
 * check-in that lands exactly on another stay's checkout day does not count
 * as a conflict.
 */
export function rangesOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart.getTime() < bEnd.getTime() && aEnd.getTime() > bStart.getTime();
}
