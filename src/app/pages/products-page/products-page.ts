import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../state/products/products.actions';
import { productsSelector } from '../../state/products/products.selectors';
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
  `
})
export class ProductsPageComponent implements OnInit {
  private store = inject(Store);
  products$ = this.store.select(productsSelector);

  ngOnInit() {
    this.store.dispatch(loadProducts({
      page: 1,
      pageSize: 10,
      minRating: 0,
      ordering: '-created_at'
    }));
  }
}
