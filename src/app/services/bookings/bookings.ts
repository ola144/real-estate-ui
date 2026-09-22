import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface IBooking {
  id?: string;
  _id?: string;
  property?: BookingProperty | string | null;
  agent?: BookingUser | string;
  agentEmail?: string;
  agentId?: string;
  date: string;
  time: string;
  guests: number | null;
  name: string;
  email: string;
  phone: string;
  customer?: BookingUser | string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingUser {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
  role?: string;
}

export interface BookingProperty {
  id?: string;
  _id?: string;
  title: string;
  photo?: string;
  price?: number;
  listingType: string;
  location?: {
    city?: string;
    state?: { name?: string };
    country?: { name?: string };
    address?: string;
  };
  agent?: BookingUser | string;
}

export interface BookingApiResponse {
  success: boolean;
  message?: string;
  booking?: IBooking;
  bookings?: IBooking[];
  count?: number;
}

const baseUrl = environment.apiBaseUrl;

@Service()
export class Bookings {
  http = inject(HttpClient);

  private apiUrl = `${baseUrl}/bookings`;

  createBooking(payload: Partial<IBooking>): Observable<BookingApiResponse> {
    return this.http.post<BookingApiResponse>(`${this.apiUrl}`, payload);
  }

  getAllBookings(): Observable<BookingApiResponse> {
    return this.http.get<BookingApiResponse>(`${this.apiUrl}`);
  }

  getBooking(id: string): Observable<BookingApiResponse> {
    return this.http.get<BookingApiResponse>(`${this.apiUrl}/${id}`);
  }

  getAllAgentBookings(agentId: string): Observable<BookingApiResponse> {
    return this.http.get<BookingApiResponse>(`${this.apiUrl}/agent/${agentId}`);
  }

  getAllCustomerBookings(customerId: string): Observable<BookingApiResponse> {
    return this.http.get<BookingApiResponse>(`${this.apiUrl}/customer/${customerId}`);
  }

  updateBookingStatus(
    payload: { status: IBooking['status'] },
    bookingId: string,
  ): Observable<BookingApiResponse> {
    return this.http.patch<BookingApiResponse>(
      `${this.apiUrl}/${bookingId}/update-status`,
      payload,
    );
  }

  deleteBooking(id: string): Observable<BookingApiResponse> {
    return this.http.delete<BookingApiResponse>(`${this.apiUrl}/${id}`);
  }
}
