import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { catalogActions } from '../../core/store/catalog.actions';
import { catalogFeature } from '../../core/store/catalog.reducer';
import { ProductItemComponent } from './product-item/product-item.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent, SearchBarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly breadcrumbs = inject(BreadcrumbService);

  protected readonly items = this.store.selectSignal(catalogFeature.selectProducts);
  protected readonly loading = this.store.selectSignal(catalogFeature.selectProductsLoading);
  protected readonly error = this.store.selectSignal(catalogFeature.selectProductsError);
  protected readonly query = signal('');

  // Filtrado en tiempo real por marca y modelo
  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.items();
    return this.items().filter((p) => `${p.brand} ${p.model}`.toLowerCase().includes(q));
  });

  ngOnInit(): void {
    this.breadcrumbs.set([{ label: 'Móviles' }]);
    this.load();
  }

  protected load(): void {
    this.store.dispatch(catalogActions.loadProducts());
  }
}
