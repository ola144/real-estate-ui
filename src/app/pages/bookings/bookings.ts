import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Loading } from '../../components/loading/loading';
import { Bookings, IBooking, BookingProperty, BookingUser } from '../../services/bookings/bookings';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule, Loading],
  templateUrl: './bookings.html',
})
export class BookingsPage implements OnInit {
  private bookingService = inject(Bookings);
  private authService = inject(Auth);
  private router = inject(Router);

  bookings = signal<IBooking[]>([]);
  loading = signal(true);
  search = signal('');
  statusFilter = signal('all');
  updatingId = signal<string | null>(null);

  get user() {
    return this.authService.currentUser();
  }

  filteredBookings = computed(() => {
    const query = this.search().trim().toLowerCase();
    const status = this.statusFilter();

    return this.bookings().filter((booking) => {
      const matchesStatus = status === 'all' || booking.status === status;
      const matchesQuery =
        !query ||
        [
          this.propertyTitle(booking),
          this.customerName(booking),
          this.customerEmail(booking),
          booking.email,
          booking.phone,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesQuery;
    });
  });

  pendingCount = computed(
    () => this.bookings().filter((booking) => booking.status === 'pending').length,
  );
  confirmedCount = computed(
    () => this.bookings().filter((booking) => booking.status === 'confirmed').length,
  );
  completedCount = computed(
    () => this.bookings().filter((booking) => booking.status === 'completed').length,
  );

  ngOnInit(): void {
    if (this.user?.role === 'admin') {
      this.loadBookings();
    } else if (this.user?.role === 'agent') {
      this.loadAgentBookings(this.user.id ?? '');
    }
  }

  loadBookings(): void {
    this.loading.set(true);
    this.bookingService.getAllBookings().subscribe({
      next: (response) => this.bookings.set(response.bookings ?? []),
      error: (error) => toast.error(error.error?.message || 'Unable to load bookings.'),
      complete: () => this.loading.set(false),
    });
  }

  loadAgentBookings(id: string): void {
    this.loading.set(true);
    this.bookingService.getAllAgentBookings(id).subscribe({
      next: (response) => this.bookings.set(response.bookings ?? []),
      error: (error) => toast.error(error.error?.message || 'Unable to load bookings.'),
      complete: () => this.loading.set(false),
    });
  }

  updateStatus(booking: IBooking, event: Event): void {
    const status = (event.target as HTMLSelectElement).value as IBooking['status'];
    const id = this.bookingId(booking);
    if (!id || !status) return;

    this.updatingId.set(id);
    this.bookingService.updateBookingStatus({ status }, id).subscribe({
      next: (response) => {
        if (response.booking) {
          this.bookings.update((items) =>
            items.map((item) => (this.bookingId(item) === id ? response.booking! : item)),
          );
        }
        toast.success(response.message || 'Booking status updated.');
      },
      error: (error) => toast.error(error.error?.message || 'Unable to update booking status.'),
      complete: () => this.updatingId.set(null),
    });
  }

  viewBooking(booking: IBooking): void {
    const id = this.bookingId(booking);
    if (id) this.router.navigate(['/dashboard/bookings', id]);
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

  propertyTitle(booking: IBooking): string {
    return this.property(booking)?.title || 'Property unavailable';
  }

  customerName(booking: IBooking): string {
    return this.customer(booking)?.name || booking.name;
  }

  customerEmail(booking: IBooking): string {
    return this.customer(booking)?.email || booking.email;
  }

  initials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }

  statusClass(status?: string): string {
    return (
      {
        pending:
          'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300',
        confirmed:
          'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300',
        completed:
          'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-300',
        cancelled: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-400/10 dark:text-red-300',
      }[status || 'pending'] || 'bg-gray-100 text-gray-600 ring-gray-500/20'
    );
  }
}
