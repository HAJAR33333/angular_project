import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../state/products/products.actions';
import {
  productsSelector,
  selectPage,
  selectTotalCount,
  selectPageSize
} from '../../state/products/products.selectors';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [CommonModule, MatCardModule, FormsModule, RouterLink],
  template: `
    <h2>Products</h2>

    <!-- BARRE DE FILTRES -->
    <div style="display:flex; gap:20px; margin-bottom:20px;">

      <!-- Filtre : rating minimum -->
      <label>
        Min Rating:
        <input
          type="number"
          min="0"
          max="5"
          [(ngModel)]="minRating"
          (change)="applyFilters()"
        />
      </label>

      <!-- Tri -->
      <label>
        Order By:
        <select [(ngModel)]="ordering" (change)="applyFilters()">
          <option value="-created_at">Newest first</option>
          <option value="created_at">Oldest first</option>
          <option value="-price">Price high → low</option>
          <option value="price">Price low → high</option>
          <option value="name">Name A → Z</option>
          <option value="-name">Name Z → A</option>
        </select>
      </label>

        <button routerLink="/shop/rating">Product Rating</button>

    </div>

    <!-- LISTE PRODUITS -->
    <div *ngIf="products$ | async as products">
      <mat-card *ngFor="let p of products" style="margin-bottom: 10px;">
        <h3>{{ p.name }}</h3>
        <p>Price: {{ p.price }} €</p>
        <p>Created: {{ p.created_at }}</p>
      </mat-card>
    </div>

    <!-- PAGINATION -->
    <div style="display:flex; gap:10px; margin-top:20px;">
      <button (click)="previous()" [disabled]="page <= 1">Previous</button>
      <button (click)="next()" [disabled]="page >= maxPage">Next</button>
    </div>

    <p style="margin-top:10px;">
      Page {{ page }} / {{ maxPage }}
    </p>
  `
})
export class ProductsPageComponent implements OnInit {
  private store = inject(Store);

  products$ = this.store.select(productsSelector);

  // Pagination locals
  page = 1;
  total = 0;
  pageSize = 10;
  maxPage = 1;

  // Filters
  minRating = 0;
  ordering = '-created_at';

  ngOnInit() {
    // Sync values depuis le store
    this.store.select(selectPage).subscribe(p => this.page = p);
    this.store.select(selectPageSize).subscribe(ps => this.pageSize = ps);
    this.store.select(selectTotalCount).subscribe(c => {
      this.total = c;
      this.maxPage = Math.ceil(c / this.pageSize);
    });

    this.load();
  }

  // Reload avec paramètres actuels
  load() {
    this.store.dispatch(loadProducts({
      page: this.page,
      pageSize: this.pageSize,
      minRating: this.minRating,
      ordering: this.ordering
    }));
  }

  // Appliquer tri + filtre → on revient page 1
  applyFilters() {
    this.page = 1;
    this.load();
  }

  next() {
    if (this.page < this.maxPage) {
      this.page++;
      this.load();
    }
  }

  previous() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }
}
