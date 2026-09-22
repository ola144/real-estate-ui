import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProperty, PropertyService } from '../../../services/property/property';
import { toast } from 'ngx-sonner';
import { Loading } from '../../../components/loading/loading';
import { Bookings, IBooking } from '../../../services/bookings/bookings';
import { form, required, FormField, disabled } from '@angular/forms/signals';
import { Auth } from '../../../services/auth/auth';

@Component({
  selector: 'app-customer-booking',
  standalone: true,
  imports: [FormsModule, RouterLink, Loading, FormField],
  templateUrl: './booking.html',
})
export class CustomerBooking {
  private route = inject(ActivatedRoute);
  propertyService = inject(PropertyService);
  bookingService = inject(Bookings);
  authService = inject(Auth);

  get user() {
    return this.authService.currentUser();
  }

  step = signal(1);
  submitted = signal(false);
  bookingModel = signal<IBooking>({
    date: '',
    time: '',
    guests: null,
    name: '',
    email: '',
    phone: '',
  });

  bookingForm = form(this.bookingModel, (path) => {
    required(path.date, {
      message: 'Date is required!',
    });

    required(path.time, {
      message: 'Time is required!',
    });
    required(path.guests, {
      message: 'Guest is required!',
    });
    required(path.email, {
      message: 'Email is required!',
    });
    disabled(path.name);
    disabled(path.email);

    required(path.phone, {
      message: 'Phone is required!',
    });
    required(path.name, {
      message: 'Name is required!',
    });
    // /^\+?[0-9\s\-()]{7,20}$/
  });

  loading = signal<boolean>(false);
  creatingBooking = signal<boolean>(false);
  propertyId = signal<string | null>('');

  property = signal<IProperty>({
    id: '',
    title: '',
    description: '',
    propertyType: '',
    price: 0,
    photo: '',
    photos: [],
    location: {
      country: {
        code: '',
        name: '',
      },
      state: {
        code: '',
        name: '',
      },
      city: '',
      address: '',
    },
    beds: 0,
    baths: 0,
    area: 0,
    facilities: [],
    status: '',
    listingType: '',
    agent: {
      _id: '',
      name: '',
      email: '',
      phone: '',
      photo: '',
      role: '',
      location: '',
      propertyCount: 0,
    },
    createdAt: '',
    updatedAt: '',
  });

  constructor() {
    effect(() => {
      const user = this.user;

      if (!user) return;

      this.bookingModel.update((booking) => ({
        ...booking,
        name: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
      }));
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.propertyId.set(id);
      this.getProperty(id);
    }
  }

  getProperty(id: string) {
    this.loading.set(true);

    this.propertyService.getProperty(id).subscribe({
      next: (res) => {
        this.property.set(res.property);
        this.loading.set(false);
      },
      error: (err) => {
        toast.error(err.errror.message || 'Failed to fetch property details');
        this.loading.set(false);
      },
    });
  }

  createBooking() {
    this.creatingBooking.set(true);

    const booking = this.bookingModel();

    const payload = {
      property: this.propertyId(),
      date: booking.date,
      time: booking.time,
      guests: booking.guests,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
    };

    this.bookingService.createBooking(payload).subscribe({
      next: (res) => {
        if (res.success) {
          toast.message(res.message || 'Booking has sent to agent successfully!');
          this.creatingBooking.set(false);
          this.submitted.set(true);
        }
      },
      error: (err) => {
        toast.error(err.message || 'Failed to send the booking. Try again!');
        this.creatingBooking.set(false);
      },
    });
  }

  next(): void {
    this.step.set(this.step() + 1);
  }

  back(): void {
    this.step.set(this.step() - 1);
  }
}
