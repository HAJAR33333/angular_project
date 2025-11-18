import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, catchError, of } from 'rxjs';
import * as RatingActions from './rating.actions';

@Injectable()
export class RatingEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RatingActions.loadRating),
      mergeMap(action =>
        this.http.get<{ avg_rating: number; count: number }>(`/api/products/${action.productId}/rating/`)
          .pipe(
            map(rating => RatingActions.loadRatingSuccess({ rating })),
            catchError(error => of(RatingActions.loadRatingFailure({ error })))
          )
      )
    )
  );
}
