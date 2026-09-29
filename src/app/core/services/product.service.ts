import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail, ProductSummary } from '../models/product.model';

export const API_URL = 'https://itx-frontend-test.onrender.com/api';

/** Solo acceso al API. La caché la gestiona el store (NgRx). */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<ProductSummary[]> {
    return this.http.get<ProductSummary[]>(`${API_URL}/product`);
  }

  getById(id: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${API_URL}/product/${id}`);
  }
}
