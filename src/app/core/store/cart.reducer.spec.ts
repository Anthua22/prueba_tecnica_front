import { cartActions } from './cart.actions';
import { cartFeature, initialCartState } from './cart.reducer';

describe('cart reducer', () => {
  it('suma uno al contador al añadir', () => {
    const state = cartFeature.reducer(
      { ...initialCartState, count: 2 },
      cartActions.addSuccess({ count: 3 }),
    );
    expect(state.count).toBe(3);
    expect(state.adding).toBeFalse();
  });

  it('mantiene el count si falla', () => {
    const state = cartFeature.reducer({ ...initialCartState, count: 2 }, cartActions.addFailure());
    expect(state.count).toBe(2);
    expect(state.feedback?.ok).toBeFalse();
  });
});
