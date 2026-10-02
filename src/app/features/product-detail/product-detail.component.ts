import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { catalogActions } from '../../core/store/catalog.actions';
import { catalogFeature, selectProductDetail } from '../../core/store/catalog.reducer';
import { ProductActionsComponent } from './product-actions/product-actions.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductImageComponent } from './product-image/product-image.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, ProductImageComponent, ProductDescriptionComponent, ProductActionsComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly breadcrumbs = inject(BreadcrumbService);

  protected readonly loading = this.store.selectSignal(catalogFeature.selectDetailLoading);
  protected readonly error = this.store.selectSignal(catalogFeature.selectDetailError);

  protected readonly product = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id') ?? ''),
      tap((id) => {
        this.breadcrumbs.set([{ label: 'Móviles', url: '/' }, { label: 'Detalle' }]);
        this.store.dispatch(catalogActions.loadProduct({ id }));
      }),
      switchMap((id) => this.store.select(selectProductDetail(id))),
      tap((p) => {
        if (p) this.breadcrumbs.set([{ label: 'Móviles', url: '/' }, { label: `${p.brand} ${p.model}` }]);
      }),
    ),
    { initialValue: null },
  );
}
