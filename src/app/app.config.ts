import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { cartFeature } from './core/store/cart.reducer';
import { catalogFeature } from './core/store/catalog.reducer';
import { provideEffects } from '@ngrx/effects';
import * as catalogEffects from './core/store/catalog.effects';
import * as cartEffects from './core/store/cart.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState(catalogFeature),
    provideState(cartFeature),
    provideEffects(catalogEffects, cartEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ],
};

