import { Component, signal } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { DashboardHeader } from '../dashboard-header/dashboard-header';

@Component({
  selector: 'app-dashboard-layout',
  imports: [Sidebar, RouterOutlet, DashboardHeader],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  sidebarOpen = signal(false);

  openSidebar(): void {
    this.sidebarOpen.update((value) => !value);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
