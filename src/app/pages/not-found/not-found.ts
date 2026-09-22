import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  private location = inject(Location);
  private router = inject(Router);

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
