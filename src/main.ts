import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './app/state/auth/auth.reducer'; 
import { AuthEffects } from './app/state/auth/auth.effects'; 
import { provideHttpClient } from '@angular/common/http';

async function main() {
  if (environment.useMsw) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } });
  }

  await bootstrapApplication(App, {
    providers: [
      provideRouter(routes),
      provideHttpClient(),          
      provideStore({ auth: authReducer }),
      provideEffects([AuthEffects]), 
    ],
  }).catch(err => console.error(err));
}

main();