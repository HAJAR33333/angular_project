import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './app/state/auth/auth.reducer'; 
import { productsReducer } from './app/state/products/products.reducer';
import { AuthEffects } from './app/state/auth/auth.effects'; 
import { ProductsEffects } from './app/state/products/products.effects';
import { provideHttpClient } from '@angular/common/http';
import { ratingReducer } from './app/state/product-rating/rating.reducer';
import { RatingEffects } from './app/state/product-rating/rating.effects';

async function main() {
  if (environment.useMsw) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } });
  }

  await bootstrapApplication(App, {
    providers: [
      provideRouter(routes),
      provideHttpClient(),          
      provideStore({ auth: authReducer, products: productsReducer,  rating: ratingReducer }),
      provideEffects([AuthEffects, ProductsEffects, RatingEffects]), 
    ],
  }).catch(err => console.error(err));
}

main();