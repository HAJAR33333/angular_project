import { createReducer, on } from '@ngrx/store';
import * as RatingActions from './rating.actions';

export interface RatingState {
  rating: { avg_rating: number; count: number } | null;
  loading: boolean;
  error: string | null;
}

export const initialState: RatingState = {
  rating: null,
  loading: false,
  error: null
};

export const ratingReducer = createReducer(
  initialState,
  on(RatingActions.loadRating, (state) => ({ ...state, loading: true, error: null })),
  on(RatingActions.loadRatingSuccess, (state, { rating }) => ({ ...state, rating, loading: false })),
  on(RatingActions.loadRatingFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
