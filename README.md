# Tienda Móvil – Prueba técnica Front-End

Mini SPA para comprar móviles, hecha con **Angular 17.1+** (standalone components + signals), **NgRx** para el estado y **Sass**. La maquetación está hecha con **Bootstrap 5** y **Bootstrap Icons**.

## Requisitos

- Node.js 18.13+ (recomendado 20 LTS)
- Angular CLI 17 (`npm install -g @angular/cli@17`)

## Instalación y ejecución

```bash
npm install
npm start   # http://localhost:4200
```

## Scripts

| Script | Comando         | Descripción                      |
| ------ | --------------- | -------------------------------- |
| START  | `npm start`     | Modo desarrollo (`ng serve`)     |
| BUILD  | `npm run build` | Compilación para producción      |
| TEST   | `npm test`      | Tests unitarios (Karma/Jasmine)  |
| LINT   | `npm run lint`  | Comprobación de código (ESLint)  |

## Dependencias principales

Si partes de un proyecto limpio, estas son las dependencias que se han añadido:

```bash
# Estado (Redux)
ng add @ngrx/store@17
ng add @ngrx/effects@17
ng add @ngrx/store-devtools@17

# Maquetación
npm install bootstrap bootstrap-icons

# Lint
ng add @angular-eslint/schematics@17
```

Bootstrap y Bootstrap Icons se cargan desde `angular.json`, en `styles`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.scss"
]
```

## Funcionalidad

- **PLP** (`/`): listado en rejilla (máx. 4 por fila, adaptativo), búsqueda en tiempo real por marca y modelo.
- **PDP** (`/product/:id`): imagen, características, selectores de almacenamiento y color (preseleccionados si solo hay una opción) y botón de añadir.
- **Header**: título como enlace al inicio, breadcrumbs y contador de la cesta visible en todas las vistas.
- **Estado (NgRx / Redux)**: `@ngrx/store` + `@ngrx/effects`. Las respuestas del API se guardan en el store junto a su `fetchedAt`; los effects solo llaman al API si el dato no existe o tiene más de 1 hora (`core/store/cache.util.ts`). Almacenaje en memoria, en cliente.
- **Cesta**: tras un `POST /api/cart` correcto, el contador se incrementa en el store y se muestra en la cabecera de todas las vistas.

## Estructura

```
src/app
├── core/       modelos, servicios HTTP y store NgRx (catalog, cart)
└── features/   product-list (item, search-bar) · product-detail (image, description, actions) · header · breadcrumb
```

## Notas

- **Caché en memoria:** al vivir en el store, la caché y el contador de la cesta se reinician al recargar la página. El enunciado permite almacenar en memoria.
- **Contador de la cesta:** el endpoint `POST /api/cart` devuelve siempre `count: 1`, por lo que el contador se incrementa en el reducer en cada respuesta correcta en lugar de usar el valor del servidor.
- **Erratas del API:** algunos campos tienen nombres con errores (`secondaryCmera`, `dimentions`); el modelo los respeta tal cual.
- **Precio:** algunos productos pueden venir sin precio; se muestra "Precio no disponible".
- **Arranque en frío:** la API está en un hosting gratuito y la primera petición puede tardar unos segundos.
- **Depuración:** con la extensión Redux DevTools se puede inspeccionar el estado y las acciones (`[Catalog] Load Products`, `[Cart] Add Success`...).
