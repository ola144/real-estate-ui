import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const roleGuard = (...allowedRoles: ('admin' | 'agent' | 'customer')[]): CanActivateFn => {
  return () => {
    const authService = inject(Auth);
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    // Don't perform browser authentication checks during SSR
    if (!isPlatformBrowser(platformId)) {
      return true;
    }

    if (authService.currentUser()) {
      return true;
    }

    return authService.getMe().pipe(
      map((res) => {
        const user = res.user;

        if (allowedRoles.includes(user.role)) {
          return true;
        }

        return router.createUrlTree(['/unauthorized']);
      }),

      catchError(() => {
        authService.clearUser();

        return of(router.createUrlTree(['/auth/login']));
      }),
    );
  };
};
