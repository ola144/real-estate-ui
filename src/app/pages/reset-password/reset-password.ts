import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Auth } from '../../services/auth/auth';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private authService = inject(Auth);
  private router = inject(Router);

  token = this.route.snapshot.queryParamMap.get('token') || '';

  isLoading = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  form: FormGroup = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator },
  );

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.token) {
      toast.error('This reset link is invalid or has expired.');
      return;
    }

    this.isLoading.set(true);
    this.authService
      .resetPassword({
        token: this.token,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
      })
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          toast.success(response.message);
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.isLoading.set(false);
          toast.error(error?.error?.message || 'Unable to reset your password.');
        },
      });
  }
}
