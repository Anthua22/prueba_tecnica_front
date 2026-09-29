import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddToCartBody } from '../models/product.model';

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    Add: props<{ body: AddToCartBody }>(),
    'Add Success': props<{ count: number }>(),
    'Add Failure': emptyProps(),
    'Reset Feedback': emptyProps(),
  },
});
