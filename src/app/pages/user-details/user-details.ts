import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Loading } from '../../components/loading/loading';
import { User } from '../../services/auth/auth';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, Loading, RouterLink],
  templateUrl: './user-details.html',
})
export class UserDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  user = signal<User | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading.set(false);
      toast.error('User ID is missing.');
      return;
    }

    this.userService.getUserById(id).subscribe({
      next: (response) => {
        this.user.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        toast.error(error?.error?.message || 'Unable to load user details.');
      },
    });
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
