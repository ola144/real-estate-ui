import { inject, Service } from '@angular/core';
import { IAgent, IAgentResponse, IAgentsResponse } from '../../core/model/agent';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IAgentDashboardStatistics } from '../../models/statistics';
import { PropertyResponse } from '../property/property';

const baseUrl = environment.apiBaseUrl;

@Service()
export class Agent {
  private http = inject(HttpClient);

  private apiUrl = `${baseUrl}/agents`;

  getAgents(page = 1, limit = 10, search = ''): Observable<IAgentsResponse> {
    let params = new HttpParams().set('page', page).set('limit', limit);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<IAgentsResponse>(this.apiUrl, {
      params,
    });
  }

  getAgent(id: string): Observable<IAgentResponse> {
    return this.http.get<IAgentResponse>(`${this.apiUrl}/${id}`);
  }

  createAgent(data: {
    name: string;
    email: string;
    gender?: string;
    phone?: string;
    photo?: string;
    bio?: string;
    specialization?: string;
    experience?: number;
    licenseNumber?: string;
    location?: string;
  }): Observable<IAgentResponse> {
    return this.http.post<IAgentResponse>(this.apiUrl, data);
  }

  updateAgent(id: string | null, data: Partial<IAgent>): Observable<IAgentResponse> {
    return this.http.patch<IAgentResponse>(`${this.apiUrl}/${id}`, data);
  }

  deactivateAgent(id: string | undefined) {
    return this.http.patch<{
      success: boolean;
      message: string;
    }>(`${this.apiUrl}/${id}/deactivate`, {});
  }

  activateAgent(id: string | undefined) {
    return this.http.patch<{
      success: boolean;
      message: string;
    }>(`${this.apiUrl}/${id}/activate`, {});
  }

  getAgentDashboardStatistics() {
    return this.http.get<{
      success: boolean;

      statistics: IAgentDashboardStatistics;
    }>(`${this.apiUrl}/dashboard/statistics`);
  }

  getAgentProperties(
    id: string,
    filters?: {
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
    },
  ): Observable<PropertyResponse> {
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

    return this.http.get<PropertyResponse>(`${this.apiUrl}/properties/${id}`, {
      params,
    });
  }
}
