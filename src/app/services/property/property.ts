import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PropertyLocation {
  country: {
    code: string;
    name: string;
  };
  state: {
    code: string;
    name: string;
  };
  city: string;
  address: string;
}

export interface IProperty {
  id: string;

  title: string;

  description: string;

  propertyType: string;

  price: number;

  photo: string;

  photos: string[];

  location: PropertyLocation;

  beds: number;

  baths: number;

  area: number;

  facilities: string[];

  status: string;
  listingType: string;

  agent: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    photo: string;
    role: string;
    propertyCount: number;
    location: string;
  };

  createdAt: string;

  updatedAt: string;
}

export interface PropertyResponse {
  success: boolean;

  count: number;

  total: number;

  page: number;

  limit: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  properties: IProperty[];
}

export interface SinglePropertyResponse {
  success: boolean;

  property: IProperty;
}

const baseUrl = environment.apiBaseUrl;

@Service()
export class PropertyService {
  private http = inject(HttpClient);

  private apiUrl = `${baseUrl}/properties`;

  getProperties(filters?: {
    page?: number;
    limit?: number;
    search?: string;
    propertyType?: string;
    country?: string;
    state?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: string;
    sort?: string;
  }): Observable<PropertyResponse> {
    let params = new HttpParams();

    if (filters?.page) {
      params = params.set('page', filters.page);
    }

    if (filters?.limit) {
      params = params.set('limit', filters.limit);
    }

    if (filters?.search) {
      params = params.set('search', filters.search);
    }

    if (filters?.propertyType) {
      params = params.set('propertyType', filters.propertyType);
    }

    if (filters?.country) {
      params = params.set('country', filters.country);
    }

    if (filters?.state) {
      params = params.set('state', filters.state);
    }

    if (filters?.city) {
      params = params.set('city', filters.city);
    }

    if (filters?.minPrice !== undefined) {
      params = params.set('minPrice', filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      params = params.set('maxPrice', filters.maxPrice);
    }

    if (filters?.status) {
      params = params.set('status', filters.status);
    }

    if (filters?.sort) {
      params = params.set('sort', filters.sort);
    }

    return this.http.get<PropertyResponse>(this.apiUrl, {
      params,
    });
  }

  getProperty(id: string | null): Observable<SinglePropertyResponse> {
    return this.http.get<SinglePropertyResponse>(`${this.apiUrl}/${id}`);
  }

  createProperty(property: Partial<IProperty>): Observable<SinglePropertyResponse> {
    return this.http.post<SinglePropertyResponse>(this.apiUrl, property);
  }

  updateProperty(
    id: string | null,
    property: Partial<IProperty>,
  ): Observable<SinglePropertyResponse> {
    return this.http.patch<SinglePropertyResponse>(`${this.apiUrl}/${id}`, property);
  }

  deleteProperty(id: string): Observable<{
    success: boolean;
    message: string;
  }> {
    return this.http.delete<{
      success: boolean;
      message: string;
    }>(`${this.apiUrl}/${id}`);
  }
}
