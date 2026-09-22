import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-customer-sell',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sell.html',
})
export class CustomerSell {
  userService = inject(UserService);

  submitted = signal(false);
  loading = signal(false);

  request = { name: '', email: '', phone: '', address: '', type: 'House', notes: '' };

  submit(): void {
    this.loading.set(true);

    const payload = {
      ...this.request,
    };

    this.userService.sendPropertyRequest(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.submitted.set(true);
          this.loading.set(false);
          this.request = {
            name: '',
            email: '',
            phone: '',
            address: '',
            type: 'House',
            notes: '',
          };
        }
      },
      error: (err) => {
        this.loading.set(false);
        toast.error(err.message);
      },
    });
  }
}
