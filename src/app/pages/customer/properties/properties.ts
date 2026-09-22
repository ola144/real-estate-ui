import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user';
import { IProperty } from '../../../services/property/property';
import { toast } from 'ngx-sonner';
import { Loading } from '../../../components/loading/loading';
import { City, Country, Location, State } from '../../../services/location/location';
import { PropertCard } from '../../../components/propert-card/propert-card';

@Component({
  selector: 'app-customer-properties',
  standalone: true,
  imports: [CommonModule, Loading, PropertCard],
  templateUrl: './properties.html',
})
export class CustomerProperties implements OnInit {
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  locationService = inject(Location);

  query = signal('');
  selectedCountry = signal<Country | null>(null);
  selectedState = signal<State | null>(null);
  selectedCity = signal<string>('');
  mode = signal('All');
  loading = signal<boolean>(false);

  properties = signal<IProperty[]>([]);

  currentPage = signal<number>(1);
  limit = signal<number>(10);
  totalPages = signal<number>(0);
  totalProperties = signal<number>(0);
  hasNextPage = signal<boolean>(false);
  hasPreviousPage = signal<boolean>(false);

  states = signal<State[]>([]);
  countries = signal<Country[]>([]);
  cities = signal<City[]>([]);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const search = params.get('search');

      if (search?.trim()) {
        this.query.set(search);
      }
    });

    this.getUserProperties();
    this.getStates('NG');
  }

  getCountries() {
    this.locationService.getCountries().subscribe({
      next: (res) => {
        this.countries.set(res.countries);
      },
    });
  }

  getStates(code: string) {
    this.locationService.getStates(code).subscribe({
      next: (res) => {
        this.states.set(res.states);
      },
    });
  }

  getCities(stateCode: string) {
    this.locationService.getCities('NG', stateCode).subscribe({
      next: (res) => {
        this.cities.set(res.cities);
      },
    });
  }

  getUserProperties() {
    this.loading.set(true);

    this.userService
      .getUserProperties({
        page: this.currentPage(),
        limit: this.limit(),
        search: this.query(),
        country: this.selectedCountry()?.code,
        state: this.selectedState()?.code,
        city: this.selectedCity(),
      })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.properties.set(res.properties);

            this.properties.set(res.properties);
            this.currentPage.set(res.page);
            this.totalPages.set(res.totalPages);
            this.totalProperties.set(res.total);
            this.limit.set(res.limit);
            this.hasNextPage.set(res.hasNextPage);
            this.hasPreviousPage.set(res.hasPreviousPage);

            this.loading.set(false);
          }
        },
        error: (err) => {
          toast.error(err?.error?.message || 'Failed to fetch properties');
          this.loading.set(false);
        },
      });
  }

  pageChanged(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage.set(page);
    this.getUserProperties();
  }

  showingFrom = computed(() => {
    if (this.totalProperties() === 0) return 0;

    return (this.currentPage() - 1) * this.limit() + 1;
  });

  showingTo = computed(() => {
    return Math.min(this.currentPage() * this.limit(), this.totalProperties());
  });

  onSearch(event: Event): void {
    setTimeout(() => {
      const input = event.target as HTMLInputElement;
      this.query.set(input.value);
      this.currentPage.set(1);

      this.getUserProperties();
    }, 2000);
  }

  onChangeCountry(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCode = selectElement.value;

    const selectedCountry =
      this.countries().find((country) => country.code === selectedCode) || null;
    this.selectedCountry.set(selectedCountry);

    if (selectedCountry) {
      this.currentPage.set(1);
      this.getStates(selectedCode);
      this.getUserProperties();
    } else {
      this.states.set([]);
      this.selectedState.set(null);
    }
  }

  onChangeState(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCode = selectElement.value;

    const selectedState = this.states().find((state) => state.code === selectedCode) || null;
    this.selectedState.set(selectedState);
    this.currentPage.set(1);
    this.getUserProperties();

    if (selectedCode === '') {
      this.cities.set([]);
    }

    if (!selectedCode) {
      this.cities.set([]);
      return;
    } else {
      this.getCities(selectedCode);
    }
  }

  onChangeCity(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedName = selectElement.value;

    this.selectedCity.set(selectedName);
    this.currentPage.set(1);
    this.getUserProperties();
  }
}
