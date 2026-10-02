import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Móviles',
    loadComponent: () =>
      import('./features/product-list/product-list.component').then((m) => m.ProductListComponent),
  },
  {
    path: 'product/:id',
    title: 'Detalle del producto',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
