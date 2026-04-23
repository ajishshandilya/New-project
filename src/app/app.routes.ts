import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/home/home-page.component').then((m) => m.HomePageComponent)
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./features/about/about-page.component').then((m) => m.AboutPageComponent)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products-page.component').then((m) => m.ProductsPageComponent)
  },
  {
    path: 'dealer-locator',
    loadComponent: () =>
      import('./features/dealer-locator/dealer-locator-page.component').then(
        (m) => m.DealerLocatorPageComponent
      )
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog-page.component').then((m) => m.BlogPageComponent)
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./features/contact/contact-page.component').then((m) => m.ContactPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
