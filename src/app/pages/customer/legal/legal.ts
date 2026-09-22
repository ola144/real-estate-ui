import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ selector: 'app-customer-legal', standalone: true, templateUrl: './legal.html' })
export class CustomerLegal {
  private route = inject(ActivatedRoute);
  title = this.route.snapshot.data['title'] ?? 'Terms & conditions';
  lastUpdated = 'August 19, 2026';
}
