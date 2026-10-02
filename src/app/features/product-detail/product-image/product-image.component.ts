import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-image',
  template: `<img [src]="src()" [alt]="alt()" />`,
  standalone: true,
  styles: `
    :host { display: block; background: #fff; border: 1px solid var(--line); border-radius: var(--radius); padding: 1.5rem; }
    img { display: block; width: 100%; max-height: 480px; object-fit: contain; }
  `,
})
export class ProductImageComponent {
  readonly src = input.required<string>();
  readonly alt = input('');
}
