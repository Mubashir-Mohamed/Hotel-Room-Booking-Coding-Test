import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { toIsoDateString } from './booking/date-utils';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the brand bar, page heading and all five sample rooms', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-bar__name')?.textContent).toContain('Raintech Hotel');
    expect(compiled.querySelector('h1')?.textContent).toContain('Room Booking');
    expect(compiled.querySelectorAll('.room-card').length).toBe(5);
  });

  it('should show no booking summary before any input is provided', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card--summary')).toBeNull();
  });

  it('should filter the room list by minimum guest count', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const select = compiled.querySelector('#min-guests') as HTMLSelectElement;
    select.value = '4';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();

    const badges = Array.from(compiled.querySelectorAll('.room-card__badge')).map(
      (el) => el.textContent,
    );
    // Only the Family Room (max 4 guests) qualifies; both Deluxe (2) and
    // Executive Suite (3) rooms should be filtered out.
    expect(badges).toEqual(['R301']);
  });

  it('should clear a room selection the guest filter hides', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const deluxeRadio = compiled.querySelector(
      'input[value="R101"]',
    ) as HTMLInputElement;
    deluxeRadio.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect((fixture.componentInstance as unknown as { roomCode: () => string }).roomCode()).toBe(
      'R101',
    );

    const select = compiled.querySelector('#min-guests') as HTMLSelectElement;
    select.value = '4';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect((fixture.componentInstance as unknown as { roomCode: () => string }).roomCode()).toBe(
      '',
    );
  });

  it('should disable a room already booked for the selected dates', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const booking = (
      fixture.componentInstance as unknown as {
        bookings: readonly { roomCode: string; checkIn: Date; checkOut: Date }[];
      }
    ).bookings[0];

    const checkInInput = compiled.querySelector('#check-in') as HTMLInputElement;
    checkInInput.value = toIsoDateString(booking.checkIn);
    checkInInput.dispatchEvent(new Event('change'));

    const checkOutInput = compiled.querySelector('#check-out') as HTMLInputElement;
    checkOutInput.value = toIsoDateString(booking.checkOut);
    checkOutInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    await fixture.whenStable();

    const disabledRadio = compiled.querySelector(
      `input[value="${booking.roomCode}"][disabled]`,
    ) as HTMLInputElement | null;
    expect(disabledRadio).not.toBeNull();
    expect(compiled.querySelector('.room-card__unavailable')?.textContent).toContain(
      'Booked for these dates',
    );
  });
});
