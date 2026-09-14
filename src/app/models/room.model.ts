/** A bookable hotel room. Sample data hardcoded per assessment scope. */
export interface Room {
  readonly code: string;
  readonly roomType: string;
  readonly pricePerNight: number;
  readonly maxGuests: number;
}

export const ROOMS: readonly Room[] = [
  { code: 'R101', roomType: 'Deluxe Room', pricePerNight: 3500, maxGuests: 2 },
  { code: 'R102', roomType: 'Deluxe Room', pricePerNight: 3500, maxGuests: 2 },
  { code: 'R201', roomType: 'Executive Suite', pricePerNight: 5800, maxGuests: 3 },
  { code: 'R202', roomType: 'Executive Suite', pricePerNight: 5800, maxGuests: 3 },
  { code: 'R301', roomType: 'Family Room', pricePerNight: 4200, maxGuests: 4 },
];
