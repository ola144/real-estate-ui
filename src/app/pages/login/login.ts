import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { toast } from 'ngx-sonner';
import { environment } from '../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  authService = inject(Auth);
  router = inject(Router);
  platformId = inject(PLATFORM_ID);

  showPassword = false;
  isLoading = signal(false);

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    if (isPlatformBrowser(this.platformId)) {
      const sessionExpired = sessionStorage.getItem('sessionExpired');

      if (sessionExpired) {
        toast.error(sessionExpired);

        sessionStorage.removeItem('sessionExpired');
      }
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,

        use_fedcm_for_button: true,

        callback: (response: any) => {
          console.log('GOOGLE RESPONSE:', response);

          if (!response?.credential) {
            console.error('No Google credential received');
            return;
          }

          this.handleGoogleLogin(response.credential);
        },
      });

      google.accounts.id.renderButton(document.getElementById('google-button'), {
        theme: 'outline',
        size: 'large',
        width: 300,
      });
    }
  }

  handleGoogleLogin(credential: string) {
    this.authService.googleAuth(credential).subscribe({
      next: (res: any) => {
        if (res?.success) {
          const data = res.user;
          console.log(data);
          this.authService.currentUser.set(data);
          toast.success(res.message || 'Signup successfully!');
          this.router.navigate(['/']);
        }
      },

      error: (error) => {
        console.error('Google login failed:', error);
      },
    });
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const form = this.loginForm.value;

    const payload = {
      email: form.email,
      password: form.password,
    };

    this.isLoading.set(true);

    this.authService.login(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.authService.currentUser.set(res.user);
          const data = res.user;
          if (data.role === 'admin' || data.role === 'agent') {
            this.router.navigate(['/dashboard/home']);
          } else if (data.role === 'customer') {
            this.router.navigate(['/']);
          }
        }
      },
      error: (err) => {
        toast.error(err.error.message || 'Something went wrong. Try again!');
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
