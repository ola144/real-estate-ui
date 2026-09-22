import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth-guard';
import { NotFound } from './pages/not-found/not-found';
import { CustomerLayout } from './components/customer-layout/customer-layout';
import { CustomerHome } from './pages/customer/home/home';
import { CustomerProperties } from './pages/customer/properties/properties';
import { CustomerPropertyDetails } from './pages/customer/property-details/property-details';
import { CustomerAbout } from './pages/customer/about/about';
import { CustomerContact } from './pages/customer/contact/contact';
import { CustomerLegal } from './pages/customer/legal/legal';
import { CustomerProfile } from './pages/customer/profile/profile';
import { CustomerSell } from './pages/customer/sell/sell';
import { CustomerBookings } from './pages/customer/bookings/bookings';
import { CustomerBooking } from './pages/customer/booking/booking';
import { CustomerBookingDetails } from './pages/customer/booking-details/booking-details';

export const routes: Routes = [
  {
    path: '',
    component: CustomerLayout,
    children: [
      { path: '', component: CustomerHome },
      { path: 'properties', component: CustomerProperties },
      { path: 'properties/:id', component: CustomerPropertyDetails },
      { path: 'about', component: CustomerAbout },
      { path: 'contact', component: CustomerContact },
      { path: 'terms', component: CustomerLegal },
      { path: 'privacy', component: CustomerLegal, data: { title: 'Privacy policy' } },
      { path: 'profile', component: CustomerProfile, canActivate: [authGuard] },
      { path: 'sell', component: CustomerSell, canActivate: [authGuard] },
      { path: 'my-bookings', component: CustomerBookings, canActivate: [authGuard] },
      { path: 'my-bookings/:id', component: CustomerBookingDetails, canActivate: [authGuard] },
      { path: 'booking/:id', component: CustomerBooking, canActivate: [authGuard] },
    ],
  },
  { path: 'auth', loadChildren: () => import('./routes/auth.routes').then((m) => m.AUTH_ROUTES) },
  {
    path: 'dashboard',
    loadChildren: () => import('./routes/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  { path: 'not-found', component: NotFound },
  { path: '**', redirectTo: 'not-found' },
];
