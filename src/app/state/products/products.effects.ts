import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(action =>
        this.http.get<{ count: number; results: any[] }>(
          `/api/products/?page=${action.page}&page_size=${action.pageSize}&min_rating=${action.minRating}&ordering=${action.ordering}`
        ).pipe(
          map(res => ProductsActions.loadProductsSuccess({ data: res })),
          catchError(err => of(ProductsActions.loadProductsFailure({ error: err })))
        )
      )
    )
  );



  rateProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.rateProduct),
    mergeMap(action =>
      this.http.post<any>(`/api/products/${action.productId}/rate/`, { value: action.value }).pipe(
        map(() => ProductsActions.rateProductSuccess({ productId: action.productId, value: action.value })),
        catchError(err => of(ProductsActions.rateProductFailure({ error: err })))
      )
    )
  )
);

}
