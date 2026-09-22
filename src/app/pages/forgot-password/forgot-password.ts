import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);

  isLoading = signal(false);
  submitted = signal(false);
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.authService.forgotPassword(this.form.value.email).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.submitted.set(true);
        toast.success(response.message);
      },
      error: (error) => {
        this.isLoading.set(false);
        toast.error(error?.error?.message || 'Unable to send reset instructions.');
      },
    });
  }
}
