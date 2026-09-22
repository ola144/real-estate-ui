import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './customer-layout.html',
})
export class CustomerLayout {}
