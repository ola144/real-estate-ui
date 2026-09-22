import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { agentLists } from '../../data/agents';
import { Router } from '@angular/router';
import { Agent } from '../../services/agent/agent';
import { IAgent } from '../../core/model/agent';
import { toast } from 'ngx-sonner';
import { Loading } from '../../components/loading/loading';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule, Loading],
  templateUrl: './agents.html',
})
export class Agents implements OnInit {
  router = inject(Router);
  agentService = inject(Agent);
  agents = signal<IAgent[]>([]);
  loading = signal<boolean>(false);
  isDeactivating = signal<boolean>(false);
  isActivating = signal<boolean>(false);

  currentPage = signal<number>(1);
  limit = signal<number>(10);
  totalAgents = signal<number>(0);
  totalPages = signal<number>(0);

  menuOpen = signal<string | null>(null);

  deactivateModal = signal(false);
  activateModal = signal(false);

  selectedAgent = signal<IAgent | null>({
    id: '',
    _id: '',
    name: '',
    email: '',
    role: 'agent',
    isActive: false,
  });

  constructor() {}

  ngOnInit(): void {
    this.getAgents();
  }

  getAgents() {
    this.loading.set(true);

    this.agentService.getAgents(this.currentPage(), this.limit()).subscribe({
      next: (res) => {
        this.agents.set(res.agents);
        this.loading.set(false);

        const pagination = res.pagination;

        this.currentPage.set(pagination.page);
        this.limit.set(pagination.limit);
        this.totalAgents.set(pagination.total);
        this.totalPages.set(pagination.totalPages);
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

  handleDeactivate() {
    this.isDeactivating.set(true);

    this.agentService.deactivateAgent(this.selectedAgent()?._id).subscribe({
      next: (res) => {
        toast.success(res.message || 'Agent deactivated successfully');
        this.getAgents();
        this.deactivateModal.set(false);
      },
      error: (err) => {
        toast.error(err.error.message);
        this.isDeactivating.set(false);
      },
      complete: () => {
        this.isDeactivating.set(false);
      },
    });
  }

  handleActivate() {
    this.isActivating.set(true);

    this.agentService.activateAgent(this.selectedAgent()?._id).subscribe({
      next: (res) => {
        toast.success(res.message || 'Agent activated successfully');
        this.getAgents();
        this.activateModal.set(false);
      },
      error: (err) => {
        toast.error(err.error.message);
        this.isActivating.set(false);
      },
      complete: () => {
        this.isActivating.set(false);
      },
    });
  }

  pageChanged(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage.set(page);

    this.getAgents();
  }

  showingFrom = computed(() => {
    if (this.totalAgents() === 0) return 0;

    return (this.currentPage() - 1) * this.limit() + 1;
  });

  showingTo = computed(() => {
    return Math.min(this.currentPage() * this.limit(), this.totalAgents());
  });

  toggleMenu(id: string) {
    this.menuOpen.update((current) => (current === id ? null : id));
  }

  closeMenu() {
    this.menuOpen.set(null);
  }

  addAgent() {
    this.router.navigateByUrl('/dashboard/agents/add-agent');
  }

  viewAgent(agent: IAgent) {
    this.router.navigate([`/dashboard/agents/details/${agent._id}`]);
    this.closeMenu();
  }

  editAgent(agent: IAgent) {
    this.router.navigate(['/dashboard/agents/add-agent'], {
      queryParams: {
        id: agent._id,
      },
    });
    this.closeMenu();
  }

  deactivate(agent: IAgent) {
    this.closeMenu();
    this.selectedAgent.set(agent);
    this.deactivateModal.set(true);
    console.log(this.deactivateModal());
  }

  closeDeactivateModal() {
    this.closeMenu();
    this.selectedAgent.set(null);
    this.deactivateModal.set(false);
  }

  activate(agent: IAgent) {
    this.closeMenu();
    this.selectedAgent.set(agent);
    this.activateModal.set(true);
  }

  closeActivateModal() {
    this.closeMenu();
    this.selectedAgent.set(null);
    this.activateModal.set(false);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;

    this.currentPage.set(page);
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }
}
