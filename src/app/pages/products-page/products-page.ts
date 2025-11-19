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

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [CommonModule, MatCardModule],
  template: `
    <h2>Products</h2>

    <div *ngIf="products$ | async as products">
      <mat-card *ngFor="let p of products" style="margin-bottom: 10px;">
        <h3>{{ p.name }}</h3>
        <p>Price: {{ p.price }} €</p>
        <p>Created: {{ p.created_at }}</p>
      </mat-card>
    </div>

    <div style="display:flex; gap:10px; margin-top:20px;">
      <button (click)="previous()" [disabled]="page <= 1">Previous</button>
      <button (click)="next()" [disabled]="page >= maxPage">Next</button>
    </div>
  `
})
export class ProductsPageComponent implements OnInit {
  private store = inject(Store);

  products$ = this.store.select(productsSelector);

  page = 1;
  total = 0;
  pageSize = 10;
  maxPage = 1;

  ngOnInit() {
    // récupérer valeurs du store
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
      minRating: 0,
      ordering: '-created_at'
    }));
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
