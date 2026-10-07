import { createFeature, createReducer, on } from '@ngrx/store';
import { cartActions } from './cart.actions';

export interface CartState {
  count: number;
  adding: boolean;
  feedback: { ok: boolean; text: string } | null;
}

export const initialCartState: CartState = { count: 0, adding: false, feedback: null };

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialCartState,
    on(cartActions.add, (s) => ({ ...s, adding: true, feedback: null })),
    on(cartActions.addSuccess, (s) => ({
      count: s.count + 1,
      adding: false,
      feedback: { ok: true, text: 'Producto añadido a la cesta.' },
    })),
    on(cartActions.addFailure, (s) => ({
      ...s,
      adding: false,
      feedback: { ok: false, text: 'No se ha podido añadir. Inténtalo de nuevo.' },
    })),
    on(cartActions.resetFeedback, (s) => ({ ...s, feedback: null })),
  ),
});
