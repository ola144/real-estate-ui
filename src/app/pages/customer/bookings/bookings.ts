import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Loading } from '../../../components/loading/loading';
import { Auth } from '../../../services/auth/auth';
import { Bookings, BookingProperty, IBooking } from '../../../services/bookings/bookings';

@Component({
  selector: 'app-customer-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, Loading],
  templateUrl: './bookings.html',
})
export class CustomerBookings {
  private authService = inject(Auth);
  private bookingService = inject(Bookings);

  loading = signal(true);
  upcoming = signal<IBooking[]>([]);
  past = signal<IBooking[]>([]);

  ngOnInit(): void {
    const user = this.authService.user();

    if (user?.id) {
      this.loadBookings(user.id);
      return;
    }

    this.authService.getMe().subscribe({
      next: ({ user: currentUser }) => {
        if (currentUser.id) {
          this.loadBookings(currentUser.id);
        } else {
          this.loading.set(false);
          toast.error('Unable to identify your account.');
        }
      },
      error: (error) => {
        this.loading.set(false);
        toast.error(error.error?.message || 'Unable to load your bookings.');
      },
    });
  }

  loadBookings(customerId: string): void {
    this.loading.set(true);

    this.bookingService.getAllCustomerBookings(customerId).subscribe({
      next: (response) => {
        const bookings = response.bookings ?? [];
        const today = new Date();

        this.upcoming.set(
          bookings.filter(
            (booking) =>
              new Date(booking.date) >= today &&
              booking.status !== 'cancelled' &&
              booking.status !== 'completed',
          ),
        );
        this.past.set(
          bookings.filter(
            (booking) =>
              new Date(booking.date) < today ||
              booking.status === 'cancelled' ||
              booking.status === 'completed',
          ),
        );
      },
      error: (err) => {
        toast.error(err.error?.message || 'Failed to fetch your bookings.');
      },
      complete: () => this.loading.set(false),
    });
  }

  property(booking: IBooking): BookingProperty | null {
    return typeof booking.property === 'object' ? booking.property : null;
  }

  propertyId(booking: IBooking): string {
    const property = this.property(booking);
    return property?.id || property?._id || '';
  }

  statusLabel(status?: string): string {
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending';
  }

  statusClass(status?: string): string {
    return (
      {
        pending: 'bg-amber-50 text-amber-700',
        confirmed: 'bg-emerald-50 text-emerald-700',
        completed: 'bg-blue-50 text-blue-700',
        cancelled: 'bg-red-50 text-red-700',
      }[status || 'pending'] || 'bg-gray-100 text-gray-600'
    );
  }
}
