import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RatingState } from './rating.reducer';

export const selectRatingFeature = createFeatureSelector<RatingState>('rating');

export const selectRatingState = createSelector(
  selectRatingFeature,
  (state) => state.rating
);
