import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormField, form, minLength, pattern, required, submit } from '@angular/forms/signals';
import { Country, Location, State } from '../../services/location/location';
import { IProperty, PropertyService } from '../../services/property/property';
import { FormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { Loading } from '../../components/loading/loading';

interface PropertyForm {
  title: string;
  description: string;
  propertyType: string;
  city: string;
  streetAddress: string;
  listingType: string;
  status: string;
  price: string;
  photos: string[];
  beds: string;
  baths: string;
  area: string;
}

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [FormField, FormsModule, Loading],
  templateUrl: './create-property.html',
})
export class CreateProperty implements OnInit {
  locationService = inject(Location);
  propertyService = inject(PropertyService);
  route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  countries = signal<Country[]>([]);
  states = signal<State[]>([]);
  propertyId = signal<string | null>('');
  loading = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  facilites = signal([
    'Swimming Pool',
    'Gym',
    'Garden',
    'Parking',
    'Elevator',
    'Security',
    'Playground',
  ]);

  selectedFacilities = signal<string[]>([]);

  selectedCountry = signal<{
    code: string;
    name: string;
  } | null>(null);

  selectedState = signal<{
    code: string;
    name: string;
  } | null>(null);

  // =======
  // PROPERTY MODEL
  // =======

  propertyModel = signal<PropertyForm>({
    title: '',
    description: '',
    propertyType: '',
    city: '',
    streetAddress: '',
    price: '',
    listingType: '',
    status: '',
    photos: [''],
    beds: '',
    baths: '',
    area: '',
  });

  // =======
  // FORM
  // =======

  propertyForm = form(this.propertyModel, (path) => {
    // Title
    required(path.title, {
      message: 'Property title is required',
    });

    minLength(path.title, 5, {
      message: 'Property title must be at least 5 characters',
    });

    // Description
    required(path.description, {
      message: 'Property description is required',
    });

    minLength(path.description, 20, {
      message: 'Description must be at least 20 characters',
    });

    // Property type
    required(path.propertyType, {
      message: 'Property type is required',
    });

    // Listing type
    required(path.listingType, {
      message: 'Listing type is required',
    });

    // Location
    required(path.city, {
      message: 'Property city is required',
    });

    minLength(path.city, 3, {
      message: 'Please enter a valid city name',
    });

    // Street Address
    required(path.streetAddress, {
      message: 'Property street address is required',
    });

    minLength(path.streetAddress, 5, {
      message: 'Please enter a valid street address',
    });

    // Price
    required(path.price, {
      message: 'Property price is required',
    });

    pattern(path.price, /^\d+(\.\d{1,2})?$/, {
      message: 'Enter a valid price',
    });

    // Photo
    required(path.photos, {
      message: 'Property picture is required',
    });

    required(path.beds, {
      message: 'Number of beds is required',
    });

    required(path.baths, {
      message: 'Number of baths is required',
    });

    required(path.area, {
      message: 'Property area is required',
    });
  });

  // =======
  // PROPERTY TYPES
  // =======

  propertyTypes = ['Apartment', 'House', 'Villa', 'Duplex', 'Commercial', 'Office', 'Land'];

  // =======
  // IMAGE
  // =======

  imagePreview = signal<string[]>([]);

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      const id = param?.['id'];
      this.propertyId.set(id);
      console.log('Property ID from query params:', id);

      if (id) {
        this.getProperty(id);
      }
    });

    this.getCountries();
  }

  getProperty(id: string) {
    this.loading.set(true);
    this.propertyService.getProperty(id).subscribe({
      next: (res) => {
        const property = res.property;
        this.propertyModel.set({
          title: property.title,
          description: property.description,
          propertyType: property.propertyType,
          listingType: property.listingType,
          status: property.status,
          city: property.location.city,
          streetAddress: property.location.address,
          price: property.price.toString(),
          photos: property.photos,
          beds: property.beds.toString(),
          baths: property.baths.toString(),
          area: property.area.toString(),
        });

        this.selectedCountry.set(property.location.country);
        this.selectedState.set(property.location.state);
        this.imagePreview.set(property.photos);
        this.selectedFacilities.set(property.facilities);
        this.onChangeCountry({
          target: { value: property.location.country.code },
        } as unknown as Event);
        this.loading.set(false);
      },
      error: (err) => {
        toast.error(err.error.message);
        this.loading.set(false);
      },
    });
  }

  onChangeCountry(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCode = selectElement.value;

    const selectedCountry =
      this.countries().find((country) => country.code === selectedCode) || null;
    this.selectedCountry.set(selectedCountry);

    if (selectedCountry) {
      this.getStates(selectedCountry.code);
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
    console.log('Selected State:', selectedState);
  }

  onChangeFacilities(facility: string) {
    const isSelected = this.selectedFacilities().includes(facility);

    if (isSelected) {
      this.selectedFacilities.update((facilities) => facilities.filter((f) => f !== facility));
    } else {
      this.selectedFacilities.update((facilities) => [...facilities, facility]);
    }

    console.log('Selected Facilities:', this.selectedFacilities());
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

  // =======
  // FILE SELECT
  // =======

  handleFiles(files: FileList | null): void {
    if (!files) return;

    const selectedFilesArray = Array.from(files).slice(0, 5); // Limit to 5 files

    Promise.all(
      selectedFilesArray.map(
        (file, index) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
              resolve({
                file: file,
                imageUrl: reader.result as string,
              });
            };
            reader.onerror = reject;

            reader.readAsDataURL(file);
          }),
      ),
    ).then((results) => {
      const imagePreviews = results.map((result: any) => result.imageUrl);
      this.imagePreview.set(imagePreviews);

      // Update the property model with the selected images
      this.propertyModel.update((model) => ({
        ...model,
        photos: imagePreviews,
      }));
    });
  }

  handleInputChange = (e: Event | null) => {
    this.handleFiles(e?.target ? (e.target as HTMLInputElement).files : null);
  };

  // =======
  // REMOVE IMAGE
  // =======

  removeImage(index: number) {
    const image = this.imagePreview()[index];
    this.imagePreview.update((images) => images.filter((img) => img !== image));

    this.propertyModel.update((model) => ({
      ...model,
      photos: this.imagePreview().filter((img) => img !== image),
    }));
  }

  // =======
  // SUBMIT
  // =======

  buildPayload(): Partial<IProperty> {
    const property = this.propertyModel();

    return {
      title: property.title,
      description: property.description,
      propertyType: property.propertyType,
      listingType: property.listingType,
      price: Number(property.price),
      photo: property.photos[0],
      photos: property.photos,
      location: {
        country: {
          code: this.selectedCountry()?.code || '',
          name: this.selectedCountry()?.name || '',
        },
        state: {
          code: this.selectedState()?.code || '',
          name: this.selectedState()?.name || '',
        },
        city: property.city,
        address: this.propertyId()
          ? property.streetAddress
          : `${property.streetAddress}, ${property.city}, ${this.selectedState()?.name || ''}, ${this.selectedCountry()?.name || ''}`,
      },
      beds: property.beds ? Number(property.beds) : 0,
      baths: property.baths ? Number(property.baths) : 0,
      area: property.area ? Number(property.area) : 0,
      facilities: this.selectedFacilities(),
      status: this.propertyId() ? property.status : 'available',
    };
  }

  onCreate(event: Event) {
    event.preventDefault();

    if (!this.selectedCountry() || !this.selectedState()) {
      toast.error('Please select a country and state for the property.');
      return;
    } else if (this.selectedFacilities().length === 0) {
      toast.error('Please select at least one facility for the property.');
      return;
    }

    this.isSubmitting.set(true);

    this.propertyService.createProperty(this.buildPayload()).subscribe({
      next: (res) => {
        toast.success('Property created successfully!');
        this.isSubmitting.set(false);
        this.router.navigate(['/dashboard/properties']);
      },
      error: (err) => {
        toast.error(err.error.message || 'Failed to create the property. Try again!');
        this.isSubmitting.set(false);
      },
    });
  }

  onUpdate(event: Event) {
    event.preventDefault();

    if (!this.selectedCountry() || !this.selectedState()) {
      toast.error('Please select a country and state for the property.');
      return;
    } else if (this.selectedFacilities().length === 0) {
      toast.error('Please select at least one facility for the property.');
      return;
    }

    this.isSubmitting.set(true);

    this.propertyService.updateProperty(this.propertyId(), this.buildPayload()).subscribe({
      next: (res) => {
        toast.success('Property updated successfully!');
        this.isSubmitting.set(false);
        this.router.navigate(['/dashboard/properties']);
      },
      error: (err) => {
        toast.error(err.error.message || 'Failed to update the property. Try again!');
        this.isSubmitting.set(false);
      },
    });
  }

  // =======
  // CANCEL
  // =======

  cancel(): void {
    this.router.navigate(['/dashboard/properties']);
  }
}
