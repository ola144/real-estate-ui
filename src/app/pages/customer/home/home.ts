import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { properties } from '../../../data/properties';
import { FormsModule } from '@angular/forms';
import { IProperty, PropertyService } from '../../../services/property/property';
import { CommonModule } from '@angular/common';
import { Loading } from '../../../components/loading/loading';
import { UserService } from '../../../services/user';
import { PropertCard } from '../../../components/propert-card/propert-card';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, Loading, PropertCard],
  templateUrl: './home.html',
})
export class CustomerHome implements OnInit {
  router = inject(Router);
  userService = inject(UserService);

  featuredProperties = signal<IProperty[]>([]);
  loading = signal<boolean>(false);
  searchTerms: string = '';

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties() {
    this.loading.set(true);
    this.userService.getUserProperties().subscribe({
      next: (res) => {
        const properties = res.properties;
        this.featuredProperties.set(properties.sort(() => Math.random() - 0.5).slice(0, 3));
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
      },
    });
  }

  onSearchPropert() {
    if (this.searchTerms.trim()) {
      this.router.navigate(['/properties'], {
        queryParams: { search: this.searchTerms },
      });
    } else {
      this.router.navigate(['/properties']);
    }
  }
}
