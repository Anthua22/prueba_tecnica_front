# Tienda Móvil – Prueba técnica Front-End

Mini SPA para comprar móviles, hecha con **Angular 17.1+** (standalone components + signals) y **Sass**.

## Scripts

| Script          | Comando         | Descripción                    |
| --------------- | --------------- | ------------------------------ |
| START           | `npm start`     | Modo desarrollo (`ng serve`)   |
| BUILD           | `npm run build` | Compilación de producción      |
| TEST            | `npm test`      | Tests unitarios (Karma/Jasmine)|
| LINT            | `npm run lint`  | Comprobación de código (ESLint)|

```bash
npm install
ng add @ngrx/store@17 && ng add @ngrx/effects@17   # si aún no están instalados
npm start   # http://localhost:4200
```

## Funcionalidad

- **PLP** (`/`): listado en rejilla (máx. 4 por fila, adaptativo), búsqueda en tiempo real por marca y modelo.
- **PDP** (`/product/:id`): imagen, características, selectores de almacenamiento y color (preseleccionados si solo hay una opción) y botón de añadir.
- **Header**: título como enlace al inicio, breadcrumbs y contador de la cesta visible en todas las vistas.
- **Estado (NgRx / Redux)**: `@ngrx/store` + `@ngrx/effects`. Las respuestas del API se guardan en el store junto a su `fetchedAt`; los effects solo llaman al API si el dato tiene más de 1 hora (`core/store/cache.util.ts`). Almacenaje en memoria, en cliente.
- **Cesta**: `POST /api/cart` devuelve `count`, que se guarda en el store y se muestra en la cabecera de todas las vistas.

## Estructura

```
src/app
├── core/       modelos, servicios HTTP y store NgRx (catalog, cart)
├── shared/     header
└── features/   product-list (item, search-bar) · product-detail (image, description, actions)
```

## Notas

- La API tiene erratas (`secondaryCmera`, `dimentions`); el modelo las respeta.
- Algunos productos pueden venir sin precio; se muestra "Precio no disponible".
- Hosting gratuito de la API: la primera petición puede tardar unos segundos (arranque en frío).
