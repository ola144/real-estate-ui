import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
  output,
  signal,
} from '@angular/core';
import { ThemeService } from '../../services/theme';
import { Auth } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Logout } from '../logout/logout/logout';

@Component({
  selector: 'app-dashboard-header',
  imports: [Logout],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {
  authService = inject(Auth);
  router = inject(Router);

  showLogoutPopup = signal(false);

  get user() {
    return this.authService.user;
  }

  toggleTheme = output<void>();

  openSidebar = output<void>();

  onOpenSidebar(): void {
    this.openSidebar.emit();
  }
}
