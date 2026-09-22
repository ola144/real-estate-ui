import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { Auth } from '../../services/auth/auth';
import { isPlatformBrowser } from '@angular/common';
import { toast } from 'ngx-sonner';
import { Logout } from '../logout/logout/logout';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Logout],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements AfterViewInit, OnInit {
  @ViewChild('header') header!: ElementRef<HTMLElement>;
  router = inject(Router);
  authService = inject(Auth);

  private platformId = inject(PLATFORM_ID);

  isHome = signal('');
  showMobileMenu = signal(false);
  showLogoutPopup = signal(false);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHome.set(event.url);
      });
  }

  ngAfterViewInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHome.set(event.url);
      });

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  private handleScroll = () => {
    if (window.scrollY > 0) {
      this.header?.nativeElement?.classList.add('scrollBg');
    } else {
      this.header?.nativeElement?.classList.remove('scrollBg');
    }
  };
}
