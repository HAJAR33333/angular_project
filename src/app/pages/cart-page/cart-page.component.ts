import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { selectCartItems, selectCartCount } from '../../state/carte/cart.selectors';
import { updateQuantity, removeFromCart, clearCart } from '../../state/carte/cart.actions';

@Component({
  standalone: true,
  selector: 'app-cart-page',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  styles: [`
    .cart-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding-top: 40px;
      background-image: url('/login-bg.png');
    }

    .cart-card {
      max-width: 650px;
      width: 100%;
      padding: 24px;
      border-radius: 16px;
      background: rgba(232, 222, 209, 0.9); 
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    }

    .cart-title {
      text-align: center;
      font-size: 1.8rem;
      margin-bottom: 24px;
      color: #2d2d2d;
    }

    .empty-cart {
      text-align: center;
      padding: 40px 0;
      color: #8e8e8e;
      font-size: 1.1rem;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 12px;
      margin-bottom: 12px;
      border-radius: 12px;
      background-color: #f9f7f5;
    }

    .item-info {
      display: flex;
      flex-direction: column;
    }

    .item-name {
      font-weight: 600;
      color: #2d2d2d;
    }

    .item-price {
      font-size: 0.9rem;
      color: #8e8e8e;
    }

    .item-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .qty-input {
      width: 60px;
      padding: 6px;
      border-radius: 8px;
      border: 1px solid #ddd;
      text-align: center;
    }

    .cart-summary {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #eee;
    }

    .summary-line {
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
      margin-bottom: 16px;
    }

    .summary-actions {
      display: flex;
      gap: 12px;
    }

    .btn-checkout {
      flex: 1;
      background-color: #a67c52 !important;
      color: #ffffff !important;
      font-weight: 600;
    }

    .btn-checkout:hover {
      background-color: #ffffff !important;
      color: #a67c52 !important;
    }

    .btn-clear {
      color: #a67c52 !important;
      flex: 1;
    }

    .btn-clear:hover {
      color: #ffffff !important;
      background-color: #a67c52 !important;
      flex: 1;
    }

    .deleat-btn {
      color: #FFFFFF !important; 
      background-color: #A67C52 !important; 
    }

    .deleat-btn:hover {
      color: #A67C52 !important; 
      background-color: #FFFFFF !important; 
    }

  `],
  template: `
    <section class="cart-container">
      <mat-card class="cart-card">
        <h2 class="cart-title">Mon panier</h2>

        <ng-container *ngIf="items$ | async as items">

          <div *ngIf="items.length === 0" class="empty-cart">
            Votre panier est vide
          </div>

          <div *ngIf="items.length > 0">

            <div *ngFor="let item of items" class="cart-item">
              <div class="item-info">
                <span class="item-name">Produit #{{ item.productId }}</span>
                <span class="item-price">
                  {{ item.price | number:'1.2-2' }} € / unité
                </span>
              </div>

              <div class="item-actions">
                <input
                  type="number"
                  min="1"
                  class="qty-input"
                  [value]="item.quantity"
                  (change)="changeQuantity(item.productId, $any($event.target).value)"
                />

                <button
                  mat-stroked-button
                  color="warn"
                  class="deleat-btn"
                  (click)="remove(item.productId)">
                  Supprimer
                </button>
              </div>
            </div>

            <div class="cart-summary">
              <div class="summary-line">
                <span>Total articles</span>
                <strong>{{ totalCount$ | async }}</strong>
              </div>

              <div class="summary-actions">
                <button
                  mat-stroked-button
                  class="btn-clear"
                  (click)="clear()">
                  Vider le panier
                </button>

                <button
                  mat-raised-button
                  class="btn-checkout"
                  routerLink="/checkout/step1">
                  Commander
                </button>
              </div>
            </div>

          </div>
        </ng-container>
      </mat-card>
    </section>
  `
})
export class CartPageComponent {

  private store = inject(Store);

  items$: Observable<any[]> = this.store.select(selectCartItems);
  totalCount$: Observable<number> = this.store.select(selectCartCount);

  changeQuantity(productId: number, qtyStr: string) {
    const quantity = Math.max(1, Number(qtyStr) || 1);
    this.store.dispatch(updateQuantity({ productId, quantity }));
  }

  remove(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }

  clear() {
    this.store.dispatch(clearCart());
  }
}
