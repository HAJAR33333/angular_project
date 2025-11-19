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
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [CommonModule, MatCardModule, FormsModule, RouterLink, MatButtonModule],
  template: `
    <section style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #f3e8f7;">
      <mat-card style="
        padding: 30px;
        max-width: 800px;
        width: 100%;
        background-color: #e6cbe3ff;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        border-radius: 12px;
      ">
        <h2 style="color: #bc7ad6ff; font-size: 2rem; margin-bottom: 20px; text-align:center;">
          Products
        </h2>

        <!-- BARRE DE FILTRES -->
        <div style="display:flex; gap:20px; margin-bottom:20px; flex-wrap: wrap; justify-content: center;">
          <label style="color:#570072ff; font-weight:500;">
            Min Rating:
            <input
              type="number"
              min="0"
              max="5"
              [(ngModel)]="minRating"
              (change)="applyFilters()"
              style="margin-left:5px; padding:4px; border-radius:5px; border:1px solid #bc7ad6ff;"
            />
          </label>

          <label style="color:#570072ff; font-weight:500;">
            Order By:
            <select [(ngModel)]="ordering" (change)="applyFilters()"
              style="margin-left:5px; padding:4px; border-radius:5px; border:1px solid #bc7ad6ff;">
              <option value="-created_at">Newest first</option>
              <option value="created_at">Oldest first</option>
              <option value="-price">Price high → low</option>
              <option value="price">Price low → high</option>
              <option value="name">Name A → Z</option>
              <option value="-name">Name Z → A</option>
            </select>
          </label>

          <button 
            mat-raised-button
            routerLink="/shop/rating"
            style="
              background-color: #bc7ad6ff;
              color:white;
              font-weight:500;
              transition: transform 0.2s;
            "
            (mouseenter)="hover($event)"
            (mouseleave)="leave($event)"
          >
            Product Rating
          </button>
        </div>

        <!-- LISTE PRODUITS -->
        <div *ngIf="products$ | async as products" style="display:grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap:15px;">
          <mat-card *ngFor="let p of products" style="padding:15px; background-color:#fdf0ff; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            <h3 style="color:#570072ff;">{{ p.name }}</h3>
            <p>Price: {{ p.price }} €</p>
            <p>Created: {{ p.created_at }}</p>
          </mat-card>
        </div>

        <!-- PAGINATION -->
        <div style="display:flex; gap:10px; justify-content:center; margin-top:20px;">
          <button mat-raised-button color="primary" (click)="previous()" [disabled]="page <= 1">
            Previous
          </button>
          <button mat-raised-button color="primary" (click)="next()" [disabled]="page >= maxPage">
            Next
          </button>
        </div>

        <p style="margin-top:10px; text-align:center; color:#570072ff;">
          Page {{ page }} / {{ maxPage }}
        </p>
      </mat-card>
    </section>
  `
})
export class ProductsPageComponent implements OnInit {
  private store = inject(Store);

  products$ = this.store.select(productsSelector);

  // Pagination
  page = 1;
  total = 0;
  pageSize = 10;
  maxPage = 1;

  // Filters
  minRating = 0;
  ordering = '-created_at';

  ngOnInit() {
    this.store.select(selectPage).subscribe(p => this.page = p);
    this.store.select(selectPageSize).subscribe(ps => this.pageSize = ps);
    this.store.select(selectTotalCount).subscribe(c => {
      this.total = c;
      this.maxPage = Math.ceil(c / this.pageSize);
    });

    this.load();
  }

  load() {
    this.store.dispatch(loadProducts({
      page: this.page,
      pageSize: this.pageSize,
      minRating: this.minRating,
      ordering: this.ordering
    }));
  }

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

  hover(event: any) {
    event.target.style.transform = 'scale(1.05)';
  }

  leave(event: any) {
    event.target.style.transform = 'scale(1)';
  }
}
