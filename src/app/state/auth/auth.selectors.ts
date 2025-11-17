import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  state => !!state.access
);

export const selectAuthError = createSelector(
  selectAuthState,
  state => state.error
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  state => state.loading
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.access
);