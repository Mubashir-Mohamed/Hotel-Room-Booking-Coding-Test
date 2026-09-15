import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { validateBooking } from './booking/booking-validation';
import { addDays, parseLocalDate, rangesOverlap, toIsoDateString } from './booking/date-utils';
import { getExistingBookings } from './booking/existing-bookings';
import { ROOMS } from './models/room.model';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly rooms = ROOMS;

  protected readonly checkIn = signal('');
  protected readonly checkOut = signal('');
  protected readonly roomCode = signal('');

  /** 0 means "any" (no filter applied). */
  protected readonly minGuests = signal(0);

  /** Errors are hidden until the user has interacted with the form at least once. */
  protected readonly touched = signal(false);

  protected readonly today = new Date();
  protected readonly minCheckInDate = toIsoDateString(this.today);
  protected readonly bookings = getExistingBookings(this.today);

  /** Earliest allowed check-out: the day after the selected check-in. */
  protected readonly minCheckOutDate = computed(() => {
    const checkIn = parseLocalDate(this.checkIn());
    return checkIn ? toIsoDateString(addDays(checkIn, 1)) : this.minCheckInDate;
  });

  protected readonly visibleRooms = computed(() => {
    const minGuests = this.minGuests();
    return minGuests > 0 ? this.rooms.filter((room) => room.maxGuests >= minGuests) : this.rooms;
  });

  /** Room codes with a hardcoded booking overlapping the currently selected dates. */
  protected readonly unavailableRoomCodes = computed(() => {
    const checkIn = parseLocalDate(this.checkIn());
    const checkOut = parseLocalDate(this.checkOut());
    if (!checkIn || !checkOut || checkOut.getTime() <= checkIn.getTime()) {
      return new Set<string>();
    }

    return new Set(
      this.bookings
        .filter((booking) => rangesOverlap(checkIn, checkOut, booking.checkIn, booking.checkOut))
        .map((booking) => booking.roomCode),
    );
  });

  protected readonly result = computed(() =>
    validateBooking(
      {
        checkIn: this.checkIn() || null,
        checkOut: this.checkOut() || null,
        roomCode: this.roomCode() || null,
      },
      this.rooms,
      this.today,
      this.bookings,
    ),
  );

  protected readonly formattedTotal = computed(() => {
    const quote = this.result().quote;
    return quote ? new Intl.NumberFormat('en-IN').format(quote.totalPrice) : '';
  });

  protected onCheckInChange(event: Event): void {
    this.touched.set(true);
    this.checkIn.set((event.target as HTMLInputElement).value);
  }

  protected onCheckOutChange(event: Event): void {
    this.touched.set(true);
    this.checkOut.set((event.target as HTMLInputElement).value);
  }

  protected onRoomChange(code: string): void {
    this.touched.set(true);
    this.roomCode.set(code);
  }

  protected onMinGuestsChange(event: Event): void {
    const minGuests = Number((event.target as HTMLSelectElement).value);
    this.minGuests.set(minGuests);

    // Clear a selection the new filter would hide, so a room can't stay
    // "selected" while invisible in the list.
    const selectedRoom = this.rooms.find((room) => room.code === this.roomCode());
    if (selectedRoom && minGuests > selectedRoom.maxGuests) {
      this.roomCode.set('');
    }
  }
}
