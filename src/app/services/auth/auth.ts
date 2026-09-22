import { Injectable, inject, signal, computed, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, of, shareReplay, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
  address?: string;
  licenseNumber?: string;
  experience?: string;
  bio?: string;
  password?: string;
  role: 'admin' | 'agent' | 'customer';
}

interface AuthResponse {
  success: boolean;

  message: string;

  user: User;
}

const baseUrl = environment.apiBaseUrl;

@Service()
export class Auth {
  private http = inject(HttpClient);
  router = inject(Router);

  private apiUrl = `${baseUrl}/auth`;
  private resendTokenUrl = `${baseUrl}`;

  private meRequest$?: Observable<any>;

  currentUser = signal<User | null>(null);

  user = this.currentUser.asReadonly();

  isAuthenticated = computed(() => !!this.currentUser());

  private authState$?: Observable<AuthResponse | null>;

  login(data: { email: string | any; password: string | any }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  register(data: {
    name: string | any;
    email: string | any;
    password: string | any;
    phone?: string | any;
    role?: 'agent' | 'customer' | any;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => {
        this.currentUser.set(response.user);
      }),
    );
  }

  googleAuth(credential: string) {
    return this.http.post(`${this.apiUrl}/google`, {
      credential,
    });
  }

  forgotPassword(email: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/forgot-password`, {
      email,
    });
  }

  resetPassword(data: {
    token: string;
    password: string;
    confirmPassword: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/reset-password`,
      data,
    );
  }

  getMe(): Observable<{ user: User }> {
    // If user is already loaded, don't make another request

    const user = this.currentUser();
    if (user) {
      return of({
        user: user,
      });
    }

    // If request is already running, reuse it
    if (!this.meRequest$) {
      this.meRequest$ = this.http
        .get<AuthResponse>(`${this.apiUrl}/me`, {
          withCredentials: true,
        })
        .pipe(
          tap((res) => {
            this.currentUser.set(res.user);
          }),

          shareReplay(1),
        );
    }

    return this.meRequest$;
  }

  logout(): Observable<{
    success: boolean;
    message: string;
  }> {
    return this.http
      .post<{
        success: boolean;
        message: string;
      }>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.currentUser.set(null);
        }),
      );
  }

  resendSetupLink(agentId: string) {
    return this.http.post(`${this.resendTokenUrl}/agents/${agentId}/resend-password-link`, {});
  }

  clearUser(): void {
    this.currentUser.set(null);
    this.meRequest$ = undefined;
  }
}
