import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { cartFeature } from './core/store/cart.reducer';
import { catalogFeature } from './core/store/catalog.reducer';
import { provideEffects } from '@ngrx/effects';
import * as catalogEffects from './core/store/catalog.effects';
import * as cartEffects from './core/store/cart.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(catalogFeature),
    provideState(cartFeature),
    provideEffects(catalogEffects, cartEffects),
  ],
};

