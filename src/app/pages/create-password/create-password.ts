import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-password.html',
})
export class CreatePassword implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  loading = signal(false);
  showPassword = false;

  error = '';
  success = '';

  token = this.route.snapshot.queryParamMap.get('token') || '';

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  submit(): void {
    this.error = '';
    this.success = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const { password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.error = 'Passwords do not match.';

      return;
    }

    if (!this.token) {
      this.error = 'Invalid password setup link.';

      return;
    }

    this.loading.set(true);

    this.http
      .post<{
        success: boolean;
        message: string;
      }>(
        'http://localhost:5000/api/v1/auth/create-password',

        {
          token: this.token,
          password,
          confirmPassword,
        },
      )
      .subscribe({
        next: (response) => {
          this.loading.set(false);
          toast.success(response.message);
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },

        error: (error) => {
          this.loading.set(false);

          toast.error(error?.error?.message || 'Unable to create password.');
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }
}
