import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              access: response.access,
              refresh: response.refresh,
            })
          ),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: err.message || 'Login failed' }))
          )
        )
      )
    )
  );
}
