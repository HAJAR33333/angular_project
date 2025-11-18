import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRating } from '../../state/product-rating/rating.actions'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectRatingState } from '../../state/product-rating/rating.selectors';

@Component({
  standalone: true,
  selector: 'app-product-rating-page',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Product Rating</h2>

    <form (ngSubmit)="fetchRating()">
      <label>
        Product ID:
        <input type="number" [(ngModel)]="productId" name="productId" required>
      </label>
      <button type="submit">Get Rating</button>
    </form>

    <div *ngIf="rating$ | async as rating">
      <p>Average Rating: {{ rating?.avg_rating }}</p>
      <p>Number of Ratings: {{ rating?.count }}</p>
    </div>
  `
})
export class ProductRatingPageComponent {
  private store = inject(Store);
  productId!: number;
  rating$ = this.store.select(selectRatingState);

  fetchRating() {
    if (!this.productId) return;
    this.store.dispatch(loadRating({ productId: this.productId }));
  }
}
