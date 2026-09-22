import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth/auth';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './profile.html',
})
export class CustomerProfile {
  authService = inject(Auth);

  isEditing = signal(false);
  saved = signal(false);

  get user() {
    return this.authService.currentUser();
  }

  profile = signal({
    name: this.user?.name || '',
    email: this.user?.email || '',
    phone: this.user?.phone || '',
    location: this.user?.address || '',
    photo: this.user?.photo || '',
    preference: 'Looking to buy',
  });
  form = { ...this.profile() };

  edit(): void {
    this.form = { ...this.profile() };
    this.saved.set(false);
    this.isEditing.set(true);
  }

  save(): void {
    this.profile.set({ ...this.form });
    this.isEditing.set(false);
    this.saved.set(true);
  }
}
