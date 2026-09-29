import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { ProductService } from '../services/product.service';
import { isFresh } from './cache.util';
import { catalogActions } from './catalog.actions';
import { catalogFeature, selectProductDetailFetchedAt } from './catalog.reducer';

// Si los datos guardados en el store tienen menos de 1 hora, no se llama al API.
export const loadProducts = createEffect(
  (actions$ = inject(Actions), store = inject(Store), api = inject(ProductService)) =>
    actions$.pipe(
      ofType(catalogActions.loadProducts),
      switchMap(() =>
        store.select(catalogFeature.selectProductsFetchedAt).pipe(
          take(1),
          switchMap((fetchedAt) =>
            isFresh(fetchedAt)
              ? of(catalogActions.loadProductsFromCache())
              : api.getAll().pipe(
                  map((products) => catalogActions.loadProductsSuccess({ products, fetchedAt: Date.now() })),
                  catchError(() => of(catalogActions.loadProductsFailure())),
                ),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const loadProduct = createEffect(
  (actions$ = inject(Actions), store = inject(Store), api = inject(ProductService)) =>
    actions$.pipe(
      ofType(catalogActions.loadProduct),
      switchMap(({ id }) =>
        store.select(selectProductDetailFetchedAt(id)).pipe(
          take(1),
          switchMap((fetchedAt) =>
            isFresh(fetchedAt)
              ? of(catalogActions.loadProductFromCache())
              : api.getById(id).pipe(
                  map((product) => catalogActions.loadProductSuccess({ product, fetchedAt: Date.now() })),
                  catchError(() => of(catalogActions.loadProductFailure())),
                ),
          ),
        ),
      ),
    ),
  { functional: true },
);
