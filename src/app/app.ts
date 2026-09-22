import { Component, inject, NO_ERRORS_SCHEMA, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { Auth } from './services/auth/auth';
import { filter, take } from 'rxjs';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.html',
  schemas: [NO_ERRORS_SCHEMA],
})
export class App implements OnInit {
  authService = inject(Auth);
  themeService = inject(ThemeService);
  router = inject(Router);

  get isDark(): boolean {
    return this.themeService.isDark();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.includes('/auth')) {
          return;
        }

        this.authService.getMe().subscribe();
      });
  }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
