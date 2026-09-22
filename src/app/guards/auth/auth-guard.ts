import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { catchError, map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
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
    map(() => true),

    catchError(() => {
      authService.clearUser();

      return of(router.createUrlTree(['/auth/login']));
    }),
  );
};
