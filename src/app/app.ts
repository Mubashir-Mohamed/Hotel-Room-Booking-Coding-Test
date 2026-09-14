import { DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { validateBooking } from './booking/booking-validation';
import { addDays, parseLocalDate, toIsoDateString } from './booking/date-utils';
import { ROOMS } from './models/room.model';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly rooms = ROOMS;

  protected readonly checkIn = signal('');
  protected readonly checkOut = signal('');
  protected readonly roomCode = signal('');

  /** Errors are hidden until the user has interacted with the form at least once. */
  protected readonly touched = signal(false);

  protected readonly today = new Date();
  protected readonly minCheckInDate = toIsoDateString(this.today);

  /** Earliest allowed check-out: the day after the selected check-in. */
  protected readonly minCheckOutDate = computed(() => {
    const checkIn = parseLocalDate(this.checkIn());
    return checkIn ? toIsoDateString(addDays(checkIn, 1)) : this.minCheckInDate;
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
}
