export interface Booking {
  id: string;
  userId: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface BookingStats {
  totalBookings: number;
  bookingsPerMonth: number[];
  statusDistribution: {
    confirmed: number;
    pending: number;
    cancelled: number;
  };
}