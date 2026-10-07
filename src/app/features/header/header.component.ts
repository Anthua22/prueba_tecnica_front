import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { Store } from '@ngrx/store';
import { cartFeature } from '../../core/store/cart.reducer';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BreadcrumbComponent, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly store = inject(Store);
  private readonly cdr = inject(ChangeDetectorRef);
  protected cartCount!: number;

  constructor() {
    this.store
      .select(cartFeature.selectCount)
      .pipe(takeUntilDestroyed())
      .subscribe((count) => {
        this.cartCount = count;
        this.cdr.markForCheck();
      });
  }
}
