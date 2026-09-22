import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Loading } from '../../components/loading/loading';
import { User } from '../../services/auth/auth';
import { UserService } from '../../services/user';

type UserFilter = 'all' | 'customer' | 'agent' | 'admin';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, Loading],
  templateUrl: './users.html',
})
export class Users implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  users = signal<User[]>([]);
  roleFilters: UserFilter[] = ['all', 'customer', 'agent', 'admin'];
  loading = signal(true);
  query = signal('');
  roleFilter = signal<UserFilter>('all');
  currentPage = signal(1);
  pageSize = 10;

  filteredUsers = computed(() => {
    const search = this.query().trim().toLowerCase();
    const role = this.roleFilter();

    return this.users().filter((user) => {
      const matchesRole = role === 'all' || user.role === role;
      const matchesSearch = !search || [user.name, user.email, user.phone].some((value) =>
        value?.toLowerCase().includes(search),
      );

      return matchesRole && matchesSearch;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredUsers().length / this.pageSize)));

  visibleUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredUsers().slice(start, start + this.pageSize);
  });

  showingFrom = computed(() => (this.filteredUsers().length ? (this.currentPage() - 1) * this.pageSize + 1 : 0));
  showingTo = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredUsers().length));
  customerCount = computed(() => this.users().filter((user) => user.role === 'customer').length);
  agentCount = computed(() => this.users().filter((user) => user.role === 'agent').length);
  adminCount = computed(() => this.users().filter((user) => user.role === 'admin').length);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users.set(response.users ?? []);
        this.currentPage.set(1);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        toast.error(error?.error?.message || 'Unable to load users.');
      },
    });
  }

  setQuery(value: string): void {
    this.query.set(value);
    this.currentPage.set(1);
  }

  setRoleFilter(role: string): void {
    if (!this.roleFilters.includes(role as UserFilter)) {
      return;
    }

    this.roleFilter.set(role as UserFilter);
    this.currentPage.set(1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  viewUser(user: User): void {
    if (user.id) {
      this.router.navigate(['/dashboard/users/details', user.id]);
    }
  }

  initials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('');
  }
}
