import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Loading } from '../../../components/loading/loading';
import {
  BookingProperty,
  BookingUser,
  Bookings,
  IBooking,
} from '../../../services/bookings/bookings';

@Component({
  selector: 'app-customer-booking-details',
  standalone: true,
  imports: [CommonModule, RouterLink, Loading],
  templateUrl: './booking-details.html',
})
export class CustomerBookingDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookingService = inject(Bookings);

  booking = signal<IBooking | null>(null);
  loading = signal(true);
  cancelling = signal(false);
  cancelDialogOpen = signal(false);

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');

    if (!bookingId) {
      this.router.navigate(['/my-bookings']);
      return;
    }

    this.bookingService.getBooking(bookingId).subscribe({
      next: (response) => this.booking.set(response.booking || null),
      error: (error) => {
        toast.error(error.error?.message || 'Unable to load booking details.');
        this.router.navigate(['/my-bookings']);
      },
      complete: () => this.loading.set(false),
    });
  }

  cancelBooking(): void {
    const bookingId = this.bookingId();
    if (!bookingId) return;

    this.cancelling.set(true);
    this.bookingService.updateBookingStatus({ status: 'cancelled' }, bookingId).subscribe({
      next: (response) => {
        if (response.booking) this.booking.set(response.booking);
        this.cancelDialogOpen.set(false);
        toast.success(response.message || 'Booking cancelled successfully.');
      },
      error: (error) => {
        toast.error(error.error?.message || 'Unable to cancel this booking.');
      },
      complete: () => this.cancelling.set(false),
    });
  }

  bookingId(): string {
    const booking = this.booking();
    return booking?.id || booking?._id || '';
  }

  property(): BookingProperty | null {
    const property = this.booking()?.property;
    return property && typeof property === 'object' ? property : null;
  }

  customer(): BookingUser | null {
    const customer = this.booking()?.customer;
    return customer && typeof customer === 'object' ? customer : null;
  }

  agent(): BookingUser | null {
    const agent = this.booking()?.agent;
    return agent && typeof agent === 'object' ? agent : null;
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

  canCancel(): boolean {
    const status = this.booking()?.status;
    return status === 'pending' || status === 'confirmed';
  }
}
