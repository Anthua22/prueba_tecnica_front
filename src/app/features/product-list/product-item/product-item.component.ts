import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductSummary } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  standalone: true
})
export class ProductItemComponent {
  readonly product = input.required<ProductSummary>();
  protected readonly price = computed(() => {
    const p = this.product().price;
    return p !== '' && p != null ? `${p} €` : 'Precio no disponible';
  });
}
