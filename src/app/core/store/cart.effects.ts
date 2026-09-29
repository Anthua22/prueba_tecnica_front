import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CartService } from '../services/cart.service';
import { cartActions } from './cart.actions';

export const addToCart = createEffect(
  (actions$ = inject(Actions), api = inject(CartService)) =>
    actions$.pipe(
      ofType(cartActions.add),
      exhaustMap(({ body }) =>
        api.add(body).pipe(
          map(({ count }) => cartActions.addSuccess({ count })),
          catchError(() => of(cartActions.addFailure())),
        ),
      ),
    ),
  { functional: true },
);
