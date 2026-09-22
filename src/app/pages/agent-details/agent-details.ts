import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { agentLists } from '../../data/agents';
import { ActivatedRoute } from '@angular/router';
import { Agent } from '../../services/agent/agent';
import { IAgent } from '../../core/model/agent';
import { toast } from 'ngx-sonner';
import { Auth } from '../../services/auth/auth';
import { Loading } from '../../components/loading/loading';

@Component({
  selector: 'app-agent-details',
  standalone: true,
  imports: [CommonModule, Loading],
  templateUrl: './agent-details.html',
})
export class AgentDetails {
  route = inject(ActivatedRoute);
  agentService = inject(Agent);
  authService = inject(Auth);

  loading = signal(false);
  isResendingToken = signal(false);

  agent = signal<IAgent>({
    id: '',
    _id: '',
    name: '',
    email: '',
    role: 'agent',
    isActive: false,
    propertyStats: {
      total: 0,
      available: {
        count: 0,
        percentage: 0,
      },
      sold: {
        count: 0,
        percentage: 0,
      },
      rented: {
        count: 0,
        percentage: 0,
      },
    },
  });

  stats = signal<any[]>([]);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getAgent(id);
    }
  }

  getAgent(id: string) {
    this.loading.set(true);
    this.agentService.getAgent(id).subscribe({
      next: (res) => {
        this.agent.set(res.agent);

        const propertyStats = res.agent.propertyStats;

        this.stats.set([
          {
            label: 'Properties available',
            value: propertyStats?.available.count,
            percentage: propertyStats?.available.percentage,
            color: '#22c55e',
          },
          {
            label: 'Properties Sold',
            value: propertyStats?.sold.count,
            percentage: propertyStats?.sold.percentage,
            color: '#ef4444',
          },
          {
            label: 'Properties Rent',
            value: propertyStats?.rented.count,
            percentage: propertyStats?.rented.percentage,
            color: '#f59e0b',
          },
        ]);
      },
      error: (err) => {
        toast.error(err.error.message || 'Failed to fetch agent details!');
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  handleResendToken(id: string) {
    this.isResendingToken.set(true);
    this.authService.resendSetupLink(id).subscribe({
      next: (res: any) => {
        toast.success(res.message || 'Password token resent successfully!');
      },
      error: (err) => {
        toast.error(err.error.message || 'Failed to resend password token!');
        this.isResendingToken.set(false);
      },
      complete: () => {
        this.isResendingToken.set(false);
      },
    });
  }

  viewAll() {
    console.log('View all properties');
  }
}
