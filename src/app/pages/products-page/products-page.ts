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
import { addToCart } from '../../state/carte/cart.actions';
import { selectCartCount } from '../../state/carte/cart.selectors';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [CommonModule, MatCardModule, FormsModule, RouterLink, MatButtonModule, MatBadgeModule, MatIconModule,],
  template: `
    <section class="page">
      <div class="overlay"></div>

      <mat-card class="products-card">
        <h2>Products</h2>

        <div class="filters">
          <label>
            Min Rating:
            <input type="number" min="0" max="5" [(ngModel)]="minRating" (change)="applyFilters()">
          </label>

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

          <!-- <button mat-raised-button class="btn-rating" routerLink="/shop/rating">Product Rating</button> -->
          <button mat-raised-button class="btn-cart" routerLink="/login" matBadge="{{ cartCount$ | async }}" matBadgeColor="warn">
            Panier
          </button>
        </div>

        <div class="product-grid" *ngIf="products$ | async as products">
          <mat-card *ngFor="let p of products" class="product-card">
            <img [src]="p.imageUrl" alt="{{p.name}}" class="product-image" />
            <h3>{{ p.name }}</h3>
            <p>Price: {{ p.price }} €</p>
            <div class="rating">
              <mat-icon *ngFor="let star of getStars(p.ratings)">
                {{ star ? 'star' : 'star_border' }}
              </mat-icon>
            </div>

          <button mat-raised-button class="btn-add" (click)="addToCart(p.id, p.price)">  Ajouter au panier  </button>
</mat-card>

        </div>

        <div class="pagination">
          <button mat-raised-button class="btn-page" (click)="previous()" [disabled]="page <= 1">Previous</button>
          <button mat-raised-button class="btn-page" (click)="next()" [disabled]="page >= maxPage">Next</button>
        </div>

        <p class="page-info">Page {{ page }} / {{ maxPage }}</p>
      </mat-card>
    </section>
  `,
  styles: [`
    .page {
      position: relative;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 20px;
      background-image: url('/login-bg.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.35);
    }

    .products-card {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 900px;
      padding: 32px;
      border-radius: 14px;
      background: rgba(232, 222, 209, 0.66); 
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(4px);
      text-align: center;
    }

    h2 {
      margin-bottom: 24px;
      font-size: 2rem;
      color: #FFFF; 
    }

    
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      margin-bottom: 24px;
    }

    .filters label {
      color: #FFFF; 
      font-weight: 500;
    }

    .filters input, .filters select {
      margin-left: 5px;
      padding: 4px 6px;
      border-radius: 5px;
      border: 1px solid #FFFF;
    }

    .btn-rating {
      background-color: #A67C52 !important;
      color: #FFFFFF !important;
      font-weight: 500;
      transition: all 0.2s ease-in-out;
    }

    .btn-rating:hover {
      background-color: #ffff !important;
      color: #A67C52 !important;
    }

    .btn-cart {
      background-color: #A67C52 !important; 
      color: #FFFFFF !important;
      font-weight: 500;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }

    .product-card {
      padding: 16px;
      background-color: rgba(232, 222, 209);  
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      text-align: center;
    }

    .product-card h3 {
      color: #A67C52;
      margin: 0 0 8px 0;
    }

    .btn-add {
      margin-top: 10px;
      background-color: #A67C52 !important;
      color: #FFFFFF !important;
      transition: all 0.2s;
    }

    .btn-add:hover {
      background-color: rgba(255,255,255,0.2);
      color: #A67C52;
    }

    .pagination {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 24px;
    }

    .btn-page {
      background-color: #A67C52 !important;
      color: #FFFFFF !important;
      transition: all 0.2s;
    }

    .btn-page:hover {
      background-color: rgba(255,255,255,0.2);
      color: #A67C52;
    }

    .page-info {
      margin-top: 10px;
      color: #ffff;
      text-align: center;
    }

    .rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      margin: 6px 0;
    }

    .rating mat-icon {
      font-size: 18px;          
      height: 18px;
      width: 18px;
      color: #dabd15ff;           
    }

    .rating-number {
      margin-left: 6px;
      font-size: 0.8rem;
      color: #2D2D2D;
    }

    .product-image {
      width: 150%;
      height: 250px;          
      object-fit: cover;     
      border-radius: 10px;
      background-color: #f3f3f3;
    }
  `]
})
export class ProductsPageComponent implements OnInit {
  private store = inject(Store);

  products$ = this.store.select(productsSelector);
  cartCount$ = this.store.select(selectCartCount);

  page = 1;
  total = 0;
  pageSize = 10;
  maxPage = 1;

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

  addToCart(productId: number, price: number) {
    this.store.dispatch(addToCart({ productId, price }));
  }

  getStars(ratings: { user_id: number; value: number }[]): number[] {
  if (!ratings || ratings.length === 0) {
    return [0, 0, 0, 0, 0];
  }

  const avg =
    ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;

  return Array.from({ length: 5 }, (_, i) =>
    i < Math.round(avg) ? 1 : 0
  );
}

}
