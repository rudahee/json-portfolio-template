import { Routes } from '@angular/router';
import { workTitle } from './core/services/title.strategy';

const gallery = () => import('./pages/gallery/gallery').then((m) => m.GalleryPage);
const detail = () => import('./pages/work-detail/work-detail').then((m) => m.WorkDetailPage);

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.HomePage) },

  // Static routes
  { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.AboutPage), title: 'About' },
  { path: 'sobre-mi', redirectTo: 'about' },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then((m) => m.ContactPage), title: 'Contact' },
  { path: 'contacto', redirectTo: 'contact' },

  // Dynamic category routes: /:categoryPath (gallery) and /:categoryPath/:slug (work detail)
  // Categories are loaded from categories.json
  { path: ':categoryPath', loadComponent: gallery },
  { path: ':categoryPath/:slug', loadComponent: detail, title: workTitle },

  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage), title: 'Page not found' },
];
