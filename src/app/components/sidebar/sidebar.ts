import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  authService = inject(Auth);

  isOpen = input(false);

  closeSidebar = output<void>();

  get user() {
    return this.authService.user();
  }

  onClose(): void {
    this.closeSidebar.emit();
  }
}
