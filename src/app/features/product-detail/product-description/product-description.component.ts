import { Component, computed, input } from '@angular/core';
import { ProductDetail } from '../../../core/models/product.model';

const join = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v.join(', ') : v) || '—';

@Component({
  selector: 'app-product-description',
  standalone: true,
  template: `
    <h2 class="title">Características</h2>
    <dl class="list">
      @for (row of rows(); track row.label) {
        <div class="row"><dt>{{ row.label }}</dt><dd>{{ row.value }}</dd></div>
      }
    </dl>
  `,
  styles: `
    .title { margin: 0 0 0.75rem; font-size: 1.1rem; }
    .list { margin: 0; }
    .row { display: flex; gap: 1rem; padding: 0.4rem 0; border-bottom: 1px solid var(--line); }
    dt { flex: 0 0 9rem; color: var(--muted); }
    dd { margin: 0; }
  `
})
export class ProductDescriptionComponent {
  readonly product = input.required<ProductDetail>();

  protected readonly rows = computed(() => {
    const p = this.product();
    return [
      { label: 'Marca', value: p.brand || '—' },
      { label: 'Modelo', value: p.model || '—' },
      { label: 'Precio', value: p.price !== '' && p.price != null ? `${p.price} €` : 'No disponible' },
      { label: 'CPU', value: p.cpu || '—' },
      { label: 'RAM', value: p.ram || '—' },
      { label: 'Sistema operativo', value: p.os || '—' },
      { label: 'Resolución de pantalla', value: p.displayResolution || '—' },
      { label: 'Batería', value: p.battery || '—' },
      { label: 'Cámara trasera', value: join(p.primaryCamera) },
      { label: 'Cámara frontal', value: join(p.secondaryCmera) },
      { label: 'Dimensiones', value: p.dimentions || '—' },
      { label: 'Peso', value: p.weight ? `${p.weight} g` : '—' },
    ];
  });
}
