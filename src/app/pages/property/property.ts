import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IProperty, PropertyService } from '../../services/property/property';
import { toast } from 'ngx-sonner';
import { Loading } from '../../components/loading/loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { Country, Location, State } from '../../services/location/location';
import { FormsModule } from '@angular/forms';
import { Agent } from '../../services/agent/agent';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, RouterLink, Loading, NgxPaginationModule, FormsModule],
  templateUrl: './property.html',
})
export class Property implements OnInit {
  properService = inject(PropertyService);
  locationService = inject(Location);
  agentService = inject(Agent);
  authService = inject(Auth);

  router = inject(Router);

  properties = signal<IProperty[]>([]);
  countries = signal<Country[]>([]);
  states = signal<State[]>([]);
  loading = signal<boolean>(false);

  deleteModal = signal<boolean>(false);
  isDeleting = signal<boolean>(false);
  selectedProperty = signal<IProperty | null>(null);

  // ===========
  // SEARCH
  // ===========

  searchQuery = signal('');
  selectedCountry = signal('All');
  selectedState = signal('All');

  // ===========
  // DROPDOWNS
  // ===========

  statusOpen = signal(false);
  typeOpen = signal(false);
  countryOpen = signal(false);
  stateOpen = signal(false);

  //
  // PAGINATION
  // ===========

  currentPage = signal<number>(1);
  limit = signal<number>(10);
  totalPages = signal<number>(0);
  totalProperties = signal<number>(0);
  hasNextPage = signal<boolean>(false);
  hasPreviousPage = signal<boolean>(false);

  get user() {
    return this.authService.user();
  }

  // ===========
  // OPTIONS
  // ===========

  // statusOptions = ['Any', ...new Set(this.properties().map((p) => p.status))];

  // typeOptions = ['Any Type', 'Apartments', 'Houses', 'Commercial', 'Garages', 'Lots'];
  // typeOptions = ['Any Type', ...new Set(this.properties().map((p) => p.propertyType))];

  // countryOptions = [
  //   'All Countries',
  //   ...new Set(this.properties().map((p) => p.location.country.name)),
  // ];

  // stateOptions = ['All States', ...new Set(this.properties().map((p) => p.location.state.name))];

  ngOnInit() {
    if (this.user?.role === 'admin') {
      this.getProperties();
    } else if (this.user?.role === 'agent') {
      this.getAgentProperties();
    }

    // this.getCountries();
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

  getProperties() {
    this.loading.set(true);
    this.properService
      .getProperties({ page: this.currentPage(), limit: this.limit(), search: this.searchQuery() })
      .subscribe({
        next: (res) => {
          this.properties.set(res.properties);
          this.currentPage.set(res.page);
          this.totalPages.set(res.totalPages);
          this.totalProperties.set(res.total);
          this.limit.set(res.limit);
          this.hasNextPage.set(res.hasNextPage);
          this.hasPreviousPage.set(res.hasPreviousPage);
        },
        error: (err) => {
          toast.error(err.error.message);
          this.loading.set(false);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }

  getAgentProperties() {
    this.loading.set(true);
    this.agentService
      .getAgentProperties(this.user?.id || '', {
        page: this.currentPage(),
        limit: this.limit(),
        search: this.searchQuery(),
      })
      .subscribe({
        next: (res) => {
          this.properties.set(res.properties);
          this.currentPage.set(res.page);
          this.totalPages.set(res.totalPages);
          this.totalProperties.set(res.total);
          this.limit.set(res.limit);
          this.hasNextPage.set(res.hasNextPage);
          this.hasPreviousPage.set(res.hasPreviousPage);
        },
        error: (err) => {
          toast.error(err.error.message);
          this.loading.set(false);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }

  pageChanged(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage.set(page);
    this.getProperties();
  }

  showingFrom = computed(() => {
    if (this.totalProperties() === 0) return 0;

    return (this.currentPage() - 1) * this.limit() + 1;
  });

  showingTo = computed(() => {
    return Math.min(this.currentPage() * this.limit(), this.totalProperties());
  });

  // ===========
  // SEARCH
  // ===========

  onSearch(event: Event): void {
    setTimeout(() => {
      const input = event.target as HTMLInputElement;
      this.searchQuery.set(input.value);
      this.currentPage.set(1);

      if (this.user?.role === 'admin') {
        this.getProperties();
      } else if (this.user?.role === 'agent') {
        this.getAgentProperties();
      }
    }, 2000);
  }

  selectCountry(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCountry.set(select.value);

    console.log(select);

    this.currentPage.set(1);
    this.getStates(select.value);
  }

  selectState(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedState.set(select.value);

    this.currentPage.set(1);
  }

  editProperty(id: string) {
    this.router.navigate(['/dashboard/properties/create-property'], {
      queryParams: {
        id: id,
      },
    });
  }

  openDeleteModal(property: IProperty) {
    this.selectedProperty.set(property);
    this.deleteModal.set(true);
  }

  closeDeleteModal() {
    this.deleteModal.set(false);
    this.selectedProperty.set(null);
  }

  handleDeleteProperty() {
    if (!this.selectedProperty()) {
      return;
    }

    this.isDeleting.set(true);

    this.properService.deleteProperty(this.selectedProperty()?.id || '').subscribe({
      next: (res) => {
        toast.success('Property deleted successfully');
        this.closeDeleteModal();
        if (this.user?.role === 'admin') {
          this.getProperties();
        } else if (this.user?.role === 'agent') {
          this.getAgentProperties();
        }
        this.getProperties();
      },
      error: (err) => {
        toast.error(err.error.message);
        this.isDeleting.set(false);
      },
      complete: () => {
        this.isDeleting.set(false);
      },
    });
  }
}
