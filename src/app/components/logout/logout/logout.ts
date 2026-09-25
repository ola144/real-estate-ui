import { Component, inject, input, Input, output, signal } from '@angular/core';
import { Auth } from '../../../services/auth/auth';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  authService = inject(Auth);
  router = inject(Router);

  showLogoutPopup = input<boolean>();
  closeLogoutPopup = output<void>();

  loading = signal(false);

  onClosePopup() {
    this.showLogoutPopup();
  }

  logout() {
    this.loading.set(true);
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.loading.set(false);
      },
      error: (err) => {
        toast.error(err.message);
        this.loading.set(false);
      },
    });
  }
}
