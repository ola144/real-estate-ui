import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { AuthLayout } from '../components/auth-layout/auth-layout/auth-layout';
import { CreatePassword } from '../pages/create-password/create-password';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { ResetPassword } from '../pages/reset-password/reset-password';
export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'signup',
        component: Signup,
      },
      {
        path: 'create-password',
        component: CreatePassword,
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
      },
      {
        path: 'reset-password',
        component: ResetPassword,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ],
  },
];
