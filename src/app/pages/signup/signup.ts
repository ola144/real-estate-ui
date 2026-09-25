import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { toast } from 'ngx-sonner';
import { environment } from '../../../environments/environment';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
}

declare const google: any;

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit, AfterViewInit {
  authService = inject(Auth);
  router = inject(Router);
  platformId = inject(PLATFORM_ID);

  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],

        lastName: ['', [Validators.required, Validators.minLength(2)]],

        email: ['', [Validators.required, Validators.email]],

        phone: ['', [Validators.required]],

        password: ['', [Validators.required, Validators.minLength(8)]],

        confirmPassword: ['', [Validators.required]],

        terms: [false, Validators.requiredTrue],
      },
      {
        validators: passwordMatchValidator,
      },
    );
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
          localStorage.setItem('userId', data?.id ?? '');
          this.authService.currentUser.set(data);
          toast.success(res.message || 'Signup successfully!');
          this.router.navigate(['/']);
        }
      },

      error: (error) => {
        console.error('Google login failed:', error);
        toast.error(error.message || 'Google login failed. Try again!');
      },
    });
  }

  submit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const form = this.signupForm.value;

    const payload = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      password: form.password,
      phone: form.phone,
      role: 'customer',
    };

    this.isLoading.set(true);

    this.authService.register(payload).subscribe({
      next: (res) => {
        if (res.success) {
          const data = res.user;
          localStorage.setItem('userId', data?.id ?? '');
          console.log(data);
          toast.success(res.message || 'Signup successfully!');
          this.router.navigate(['/']);
          this.signupForm.reset();
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
