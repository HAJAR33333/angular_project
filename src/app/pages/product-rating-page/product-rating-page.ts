import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRating } from '../../state/product-rating/rating.actions'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectRatingState } from '../../state/product-rating/rating.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-product-rating-page',
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  template: `
    <section style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #f3e8f7;">
      <mat-card style="
        padding: 30px;
        max-width: 500px;
        width: 100%;
        background-color: #e6cbe3ff;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        border-radius: 12px;
        text-align: center;
      ">
        <h2 style="color: #bc7ad6ff; font-size: 2rem; margin-bottom: 20px;">
          Product Rating
        </h2>

        <form (ngSubmit)="fetchRating()" style="display: flex; flex-direction: column; gap: 15px;">
          <input 
            type="number" 
            [(ngModel)]="productId" 
            name="productId" 
            placeholder="Enter Product ID"
            required
            style="
              padding: 8px;
              border-radius: 8px;
              border: 1px solid #bc7ad6ff;
              font-size: 1rem;
            "
          />

          <button 
            mat-raised-button 
            type="submit"
            style="
              background-color: #bc7ad6ff;
              color: white;
              font-weight: 500;
              transition: transform 0.2s;
            "
            (mouseenter)="hover($event)" 
            (mouseleave)="leave($event)"
          >
            Get Rating
          </button>
        </form>

        <div *ngIf="rating$ | async as rating" style="margin-top: 20px; color:#570072ff;">
          <p>Average Rating: {{ rating?.avg_rating }}</p>
          <p>Number of Ratings: {{ rating?.count }}</p>
        </div>
      </mat-card>
    </section>
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

  hover(event: any) {
    event.target.style.transform = 'scale(1.05)';
  }

  leave(event: any) {
    event.target.style.transform = 'scale(1)';
  }
}