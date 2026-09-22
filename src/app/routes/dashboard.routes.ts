import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { AuthLayout } from '../components/auth-layout/auth-layout/auth-layout';
import { DashboardLayout } from '../components/dashboard-layout/dashboard-layout';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Property } from '../pages/property/property';
import { CreateProperty } from '../pages/create-property/create-property';
import { PropertyDetails } from '../pages/property-details/property-details';
import { Agents } from '../pages/agents/agents';
import { AgentDetails } from '../pages/agent-details/agent-details';
import { AgentForm } from '../pages/agent-form/agent-form';
import { Messages } from '../pages/messages/messages';
import { Profile } from '../pages/profile/profile';
import { BookingsPage } from '../pages/bookings/bookings';
import { BookingDetails } from '../pages/booking-details/booking-details';
import { roleGuard } from '../guards/role-guard';
import { authGuard } from '../guards/auth/auth-guard';
import { Users } from '../pages/users/users';
import { UserDetails } from '../pages/user-details/user-details';
export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayout,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'home',
        component: Dashboard,
      },
      {
        path: 'properties',
        component: Property,
      },
      {
        path: 'properties/details/:id',
        component: PropertyDetails,
      },
      {
        path: 'properties/create-property',
        component: CreateProperty,
        canActivate: [roleGuard('admin', 'agent')],
      },
      {
        path: 'agents',
        component: Agents,
        canActivate: [roleGuard('admin')],
      },
      {
        path: 'agents/details/:id',
        component: AgentDetails,
        canActivate: [roleGuard('admin')],
      },
      {
        path: 'agents/add-agent',
        component: AgentForm,
        canActivate: [roleGuard('admin')],
      },
      {
        path: 'users',
        component: Users,
        canActivate: [roleGuard('admin')],
      },
      {
        path: 'users/details/:id',
        component: UserDetails,
        canActivate: [roleGuard('admin')],
      },
      {
        path: 'messages',
        component: Messages,
      },
      {
        path: 'bookings',
        component: BookingsPage,
        canActivate: [roleGuard('admin', 'agent')],
      },
      {
        path: 'bookings/:id',
        component: BookingDetails,
        canActivate: [roleGuard('admin', 'agent')],
      },
      {
        path: 'profile',
        component: Profile,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },
];
