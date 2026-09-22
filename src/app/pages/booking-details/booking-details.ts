import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Loading } from '../../components/loading/loading';
import { BookingProperty, Bookings, BookingUser, IBooking } from '../../services/bookings/bookings';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Loading],
  templateUrl: './booking-details.html',
})
export class BookingDetails implements OnInit {
  private bookingService = inject(Bookings);
  private authService = inject(Auth);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  booking = signal<IBooking | null>(null);
  loading = signal(true);
  saving = signal(false);
  deleting = signal(false);
  deleteOpen = signal(false);

  get user() {
    return this.authService.currentUser();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/dashboard/bookings']);
      return;
    }

    this.bookingService.getBooking(id).subscribe({
      next: (response) => this.booking.set(response.booking || null),
      error: (error) => {
        toast.error(error.error?.message || 'Unable to load booking.');
        this.router.navigate(['/dashboard/bookings']);
      },
      complete: () => this.loading.set(false),
    });
  }

  updateStatus(status: IBooking['status']): void {
    const current = this.booking();
    const id = current ? this.bookingId(current) : '';
    if (!id || !status) return;

    this.saving.set(true);
    this.bookingService.updateBookingStatus({ status }, id).subscribe({
      next: (response) => {
        if (response.booking) this.booking.set(response.booking);
        toast.success(response.message || 'Booking status updated.');
      },
      error: (error) => toast.error(error.error?.message || 'Unable to update status.'),
      complete: () => this.saving.set(false),
    });
  }

  deleteBooking(): void {
    const current = this.booking();
    const id = current ? this.bookingId(current) : '';
    if (!id) return;

    this.deleting.set(true);
    this.bookingService.deleteBooking(id).subscribe({
      next: (response) => {
        toast.success(response.message || 'Booking deleted.');
        this.router.navigate(['/dashboard/bookings']);
      },
      error: (error) => {
        toast.error(error.error?.message || 'Unable to delete booking.');
        this.deleting.set(false);
      },
    });
  }

  bookingId(booking: IBooking): string {
    return booking.id || booking._id || '';
  }

  property(booking: IBooking): BookingProperty | null {
    return typeof booking.property === 'object' ? booking.property : null;
  }

  customer(booking: IBooking): BookingUser | null {
    return typeof booking.customer === 'object' ? booking.customer : null;
  }

  agent(booking: IBooking): BookingUser | null {
    return typeof booking.agent === 'object' ? booking.agent : null;
  }

  statusClass(status?: string): string {
    return (
      {
        pending: 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
        confirmed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
        completed: 'bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300',
        cancelled: 'bg-red-50 text-red-700 dark:bg-red-400/10 dark:text-red-300',
      }[status || 'pending'] || 'bg-gray-100 text-gray-600'
    );
  }
}
