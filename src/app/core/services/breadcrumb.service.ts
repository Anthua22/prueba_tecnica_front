import { Injectable, signal } from '@angular/core';
import { Crumb } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly _items = signal<Crumb[]>([]);
  readonly items = this._items.asReadonly();

  set(items: Crumb[]): void {
    this._items.set(items);
  }
}
