import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AddToCartBody } from '../models/product.model';
import { API_URL } from './product.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);

  add(body: AddToCartBody): Observable<{ count: number }> {
    return this.http.post<{ count: number }>(`${API_URL}/cart`, body);
  }
}
