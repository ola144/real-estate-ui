import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProperty, PropertyService } from '../../services/property/property';
import { toast } from 'ngx-sonner';
import { Loading } from '../../components/loading/loading';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [Loading, CommonModule],
  templateUrl: './property-details.html',
})
export class PropertyDetails {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  propertyService = inject(PropertyService);

  isBooking = signal(false);
  isLoading = signal(false);

  selectedImageIndex = signal(0);

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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getProperty(id);
    }
  }

  getProperty(id: string) {
    this.isLoading.set(true);
    this.propertyService.getProperty(id).subscribe({
      next: (res) => {
        this.property.set(res.property);
      },
      error: (err) => {
        toast.error(err.error.message || 'Failed to fetch the property details');
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/properties']);
  }

  messageAgent(): void {
    console.log('Message agent');
  }

  callAgent(): void {
    console.log('Call agent');
  }

  bookProperty(): void {
    this.isBooking.set(true);

    console.log('Booking property:', this.property());

    setTimeout(() => {
      this.isBooking.set(false);
    }, 1000);
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }
}
