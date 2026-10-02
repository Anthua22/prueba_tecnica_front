import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ProductDetail } from '../../../core/models/product.model';
import { Store } from '@ngrx/store';
import { cartActions } from '../../../core/store/cart.actions';
import { cartFeature } from '../../../core/store/cart.reducer';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrl: './product-actions.component.scss',
  standalone: true
})
export class ProductActionsComponent {
  private readonly store = inject(Store);

  readonly product = input.required<ProductDetail>();

  protected readonly storageCode = signal<number | null>(null);
  protected readonly colorCode = signal<number | null>(null);
  protected readonly adding = this.store.selectSignal(cartFeature.selectAdding);
  protected readonly feedback = this.store.selectSignal(cartFeature.selectFeedback);

  protected readonly colors = computed(() => this.product().options?.colors ?? []);
  protected readonly storages = computed(() => this.product().options?.storages ?? []);
  protected readonly canAdd = computed(
    () => this.storageCode() !== null && this.colorCode() !== null && !this.adding(),
  );

  constructor() {
    // Si solo hay una opción, queda seleccionada por defecto
    effect(() => {
      const [c, s] = [this.colors(), this.storages()];
      this.colorCode.set(c.length === 1 ? c[0].code : null);
      this.storageCode.set(s.length === 1 ? s[0].code : null);
      this.store.dispatch(cartActions.resetFeedback());
    });
  }

  protected add(): void {
    const colorCode = this.colorCode();
    const storageCode = this.storageCode();
    if (colorCode === null || storageCode === null) return;

    this.store.dispatch(
      cartActions.add({ body: { id: this.product().id, colorCode, storageCode } }),
    );
  }
}
