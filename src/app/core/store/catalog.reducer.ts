import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ProductDetail, ProductSummary } from '../models/product.model';
import { catalogActions } from './catalog.actions';

export interface CatalogState {
  products: ProductSummary[];
  productsFetchedAt: number | null;
  productsLoading: boolean;
  productsError: boolean;
  details: Record<string, { data: ProductDetail; fetchedAt: number }>;
  detailLoading: boolean;
  detailError: boolean;
}

export const initialCatalogState: CatalogState = {
  products: [],
  productsFetchedAt: null,
  productsLoading: false,
  productsError: false,
  details: {},
  detailLoading: false,
  detailError: false,
};

export const catalogFeature = createFeature({
  name: 'catalog',
  reducer: createReducer(
    initialCatalogState,
    on(catalogActions.loadProducts, (s) => ({ ...s, productsLoading: true, productsError: false })),
    on(catalogActions.loadProductsFromCache, (s) => ({ ...s, productsLoading: false })),
    on(catalogActions.loadProductsSuccess, (s, { products, fetchedAt }) => ({
      ...s, products, productsFetchedAt: fetchedAt, productsLoading: false,
    })),
    on(catalogActions.loadProductsFailure, (s) => ({ ...s, productsLoading: false, productsError: true })),

    on(catalogActions.loadProduct, (s) => ({ ...s, detailLoading: true, detailError: false })),
    on(catalogActions.loadProductFromCache, (s) => ({ ...s, detailLoading: false })),
    on(catalogActions.loadProductSuccess, (s, { product, fetchedAt }) => ({
      ...s,
      details: { ...s.details, [product.id]: { data: product, fetchedAt } },
      detailLoading: false,
    })),
    on(catalogActions.loadProductFailure, (s) => ({ ...s, detailLoading: false, detailError: true })),
  ),
});

export const selectProductDetail = (id: string) =>
  createSelector(catalogFeature.selectDetails, (details) => details[id]?.data ?? null);

export const selectProductDetailFetchedAt = (id: string) =>
  createSelector(catalogFeature.selectDetails, (details) => details[id]?.fetchedAt ?? null);
