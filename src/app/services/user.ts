import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './auth/auth';
import { PropertyResponse } from './property/property';

interface ContactApiResponse {
  success: boolean;
  message?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  users?: User[];
}

interface UpdateApiResponse<T> {
  success: boolean;
  message?: string;
  user: User | null;
}

const baseUrl = environment.apiBaseUrl;

@Service()
export class UserService {
  private http = inject(HttpClient);

  private apiUrl = `${baseUrl}`;

  getUsers(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users`);
  }

  getUserById(id: string): Observable<{ success: boolean; message?: string; data: User }> {
    return this.http.get<{ success: boolean; message?: string; data: User }>(
      `${this.apiUrl}/users/${id}`,
    );
  }

  updateUserDetails(payload: any): Observable<UpdateApiResponse<User>> {
    return this.http.patch<UpdateApiResponse<User>>(`${this.apiUrl}/users/update-user`, payload);
  }

  getUserProperties(filters?: {
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

    if (filters?.sort) {
      params = params.set('sort', filters.sort);
    }

    return this.http.get<PropertyResponse>(`${this.apiUrl}/users/properties/available`, {
      params,
    });
  }

  sendContactMessage(payload: any): Observable<ContactApiResponse> {
    return this.http.post<ContactApiResponse>(`${this.apiUrl}/users/contact`, payload);
  }

  sendPropertyRequest(payload: any): Observable<ContactApiResponse> {
    return this.http.post<ContactApiResponse>(`${this.apiUrl}/users/request-sell`, payload);
  }
}
