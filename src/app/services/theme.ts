import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'real-estate-theme';

  private readonly _theme = signal<Theme>('light');

  readonly theme = this._theme.asReadonly();

  constructor(
    @Inject(DOCUMENT)
    private document: Document,

    @Inject(PLATFORM_ID)
    private platformId: object,
  ) {
    this.initializeTheme();
  }

  /**
   * Initialize theme when application starts
   */
  private initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const savedTheme = localStorage.getItem(this.storageKey) as Theme | null;

    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.setTheme(savedTheme);
      return;
    }

    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.setTheme(prefersDark ? 'dark' : 'light');
  }

  /**
   * Set theme
   */
  setTheme(theme: Theme): void {
    this._theme.set(theme);

    const html = this.document.documentElement;

    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  /**
   * Toggle between light and dark
   */
  toggleTheme(): void {
    const currentTheme = this._theme();

    this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  /**
   * Check if dark mode is active
   */
  isDark(): boolean {
    return this._theme() === 'dark';
  }
}
