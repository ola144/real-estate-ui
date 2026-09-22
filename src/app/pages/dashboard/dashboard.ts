import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IAgent,
  agents,
  latestSales,
  properties,
  Property,
  referrals,
  revenueData,
  Sale,
  StatCard,
  stats,
} from '../../data/dashboard';
import { RevenueChart } from '../../components/revenue-chart/revenue-chart';
import { IAdminDashboardStatistics, IAgentDashboardStatistics } from '../../models/statistics';
import { Agent } from '../../services/agent/agent';
import { Auth } from '../../services/auth/auth';
import { PropertyService } from '../../services/property/property';
import { CommonModule } from '@angular/common';
import { Admin } from '../../services/admin';
import { Loading } from '../../components/loading/loading';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-dashboard',
  imports: [RevenueChart, CommonModule, RouterLink, Loading],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  agentService = inject(Agent);
  propertyService = inject(PropertyService);
  authService = inject(Auth);
  adminService = inject(Admin);

  user = this.authService.user();

  statistics = signal<IAgentDashboardStatistics | null>(null);
  adminStatistics = signal<IAdminDashboardStatistics | null>(null);

  isLoading = signal(false);

  isDark = signal(false);

  statList = signal<any[]>([]);
  revenueData = signal(revenueData);
  agentList = signal<IAgent[]>(agents);
  referralList = signal(referrals);
  latestSales = signal<Sale[]>(latestSales);
  propertyList = signal<any[]>([]);

  // =========
  // PROPERTY TYPES
  // =========

  propertyTypes = computed(() => {
    const types = this.statistics()?.properties?.byType;

    if (!types) {
      return [];
    }

    const total = this.statistics()?.overview?.totalProperties ?? 0;

    return Object.entries(types).map(([name, count]) => ({
      name,

      count,

      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }));
  });

  adminPropertyTypes = computed(() => {
    const types = this.adminStatistics()?.properties?.byType;

    if (!types) {
      return [];
    }

    const total = this.adminStatistics()?.overview?.totalProperties ?? 0;

    return Object.entries(types).map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }));
  });

  ngOnInit(): void {
    if (this.user?.role === 'agent') {
      this.loadAgentStatistics();
    }
    if (this.user?.role === 'admin') {
      this.loadAdminStatistics();
    }
  }

  getBarHeight(value: number): string {
    return `${value * 1.15}px`;
  }

  loadAdminStatistics(): void {
    this.isLoading.set(true);

    this.adminService.getAdminDashboardStatistics().subscribe({
      next: (response) => {
        this.adminStatistics.set(response.statistics);

        const overview = response.statistics.overview;

        this.statList.set([
          {
            title: 'total agent',
            value: overview.totalAgents,
            total: response.statistics.agents.total + response.statistics.customers.total,
            color: '#4f5bea',
          },
          {
            title: 'total customers',
            value: overview.totalCustomers,
            total: response.statistics.agents.total + response.statistics.customers.total,
            color: '#ff7a32',
          },
          {
            title: 'available properties',
            value: overview.availableProperties,
            total: overview.totalProperties,
            color: '#ff5c86',
          },

          {
            title: 'sold properties',
            value: overview.soldProperties,
            total: overview.totalProperties,
            color: '#21c884',
          },
          {
            title: 'rented properties',
            value: overview.rentedProperties,
            total: overview.totalProperties,
            color: '#4f5bea',
          },
        ]);

        this.isLoading.set(false);
      },

      error: (error) => {
        toast.error(error.message);

        this.isLoading.set(false);
      },
    });
  }

  loadAgentStatistics(): void {
    this.isLoading.set(true);

    this.agentService.getAgentDashboardStatistics().subscribe({
      next: (response) => {
        this.statistics.set(response.statistics);

        this.isLoading.set(false);
      },

      error: (error) => {
        toast.error(error.message);

        this.isLoading.set(false);
      },
    });
  }

  getNumberPercentage(value: number, total: number): number {
    if (!total || total <= 0) {
      return 0;
    }

    return Math.round((value / total) * 100);
  }

  getPercentage(value: number, total: number): string {
    const percentage = this.getNumberPercentage(value, total);

    return `
      conic-gradient(
        #5362e8
        ${percentage}%,
        #edf0f3
        ${percentage}%
      )
    `;
  }
}
