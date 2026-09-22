import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProperty, PropertyService } from '../../../services/property/property';
import { toast } from 'ngx-sonner';
import { Loading } from '../../../components/loading/loading';
import { Auth } from '../../../services/auth/auth';

@Component({
  selector: 'app-customer-property-details',
  standalone: true,
  imports: [CommonModule, RouterLink, Loading],
  templateUrl: './property-details.html',
})
export class CustomerPropertyDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  propertyService = inject(PropertyService);
  authService = inject(Auth);

  loading = signal<boolean>(false);

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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
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

  arrangeView(propertyId: string) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/booking/${propertyId}`]);
    } else {
      toast.error('Login to arrange a view!');
      this.router.navigateByUrl('/auth/login');
    }
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }
}
