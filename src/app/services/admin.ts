import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAdminDashboardStatistics } from '../models/statistics';

const baseUrl = environment.apiBaseUrl;

@Service()
export class Admin {
  private http = inject(HttpClient);

  private apiUrl = `${baseUrl}/admin`;

  getAdminDashboardStatistics() {
    return this.http.get<{
      success: boolean;

      statistics: IAdminDashboardStatistics;
    }>(`${this.apiUrl}/dashboard/statistics`);
  }
}
