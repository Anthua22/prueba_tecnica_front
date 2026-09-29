import { catalogActions } from './catalog.actions';
import { catalogFeature, initialCatalogState } from './catalog.reducer';

describe('catalog reducer', () => {
  it('guarda el listado y su fecha de carga', () => {
    const state = catalogFeature.reducer(
      initialCatalogState,
      catalogActions.loadProductsSuccess({
        products: [{ id: '1', brand: 'A', model: 'B', price: 10, imgUrl: '' }],
        fetchedAt: 123,
      }),
    );
    expect(state.products.length).toBe(1);
    expect(state.productsFetchedAt).toBe(123);
  });
});
