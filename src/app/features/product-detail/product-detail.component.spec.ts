import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCatalogState } from '../../core/store/catalog.reducer';
import { ProductListComponent } from '../product-list/product-list.component';

describe('ProductListComponent', () => {
  const products = [
    { id: '1', brand: 'Acer', model: 'Liquid', price: 100, imgUrl: '' },
    { id: '2', brand: 'Apple', model: 'iPhone', price: 900, imgUrl: '' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState: { catalog: { ...initialCatalogState, products } } }),
      ],
    });
  });

  it('filtra por marca o modelo', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'iphone';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-product-item').length).toBe(1);
  });
});
