import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductDetail, ProductSummary } from '../models/product.model';

export const catalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    'Load Products': emptyProps(),
    'Load Products From Cache': emptyProps(),
    'Load Products Success': props<{ products: ProductSummary[]; fetchedAt: number }>(),
    'Load Products Failure': emptyProps(),

    'Load Product': props<{ id: string }>(),
    'Load Product From Cache': emptyProps(),
    'Load Product Success': props<{ product: ProductDetail; fetchedAt: number }>(),
    'Load Product Failure': emptyProps(),
  },
});
