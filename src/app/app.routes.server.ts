import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // =========================
  // PUBLIC PAGES
  // =========================

  {
    path: '',
    renderMode: RenderMode.Prerender,
  },

  {
    path: 'properties',
    renderMode: RenderMode.Server,
  },

  {
    path: 'properties/:id',
    renderMode: RenderMode.Server,
  },

  {
    path: 'sell',
    renderMode: RenderMode.Prerender,
  },

  {
    path: 'terms',
    renderMode: RenderMode.Prerender,
  },

  {
    path: 'privacy',
    renderMode: RenderMode.Prerender,
  },

  {
    path: 'not-found',
    renderMode: RenderMode.Prerender,
  },

  // =========================
  // BOOKING
  // =========================

  {
    path: 'booking/:id',
    renderMode: RenderMode.Server,
  },

  {
    path: 'my-bookings/:id',
    renderMode: RenderMode.Server,
  },

  // =========================
  // AUTH
  // =========================

  {
    path: 'auth',
    renderMode: RenderMode.Client,
  },

  {
    path: 'auth/signup',
    renderMode: RenderMode.Client,
  },

  {
    path: 'auth/forgot-password',
    renderMode: RenderMode.Client,
  },

  // =========================
  // DASHBOARD
  // =========================

  {
    path: 'dashboard',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/home',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/properties',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/properties/create-property',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/properties/details/:id',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/agents',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/agents/add-agent',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/agents/details/:id',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/users',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/users/details/:id',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/bookings',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/bookings/:id',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/messages',
    renderMode: RenderMode.Client,
  },

  {
    path: 'dashboard/profile',
    renderMode: RenderMode.Client,
  },

  // =========================
  // USER PROFILE
  // =========================

  {
    path: 'profile',
    renderMode: RenderMode.Client,
  },

  {
    path: 'my-bookings',
    renderMode: RenderMode.Client,
  },

  // =========================
  // FALLBACK
  // =========================

  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
