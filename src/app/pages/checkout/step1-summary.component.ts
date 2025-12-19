import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { selectCartItems, selectCartTotal } from '../../state/carte/cart.selectors';

@Component({
  standalone: true,
  selector: 'app-step1-summary',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  styles: [`
    .summary-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 40px;
    }

    .summary-card {
      max-width: 650px;
      width: 100%;
      padding: 28px;
      border-radius: 16px;
      background: rgba(232, 222, 209, 0.88); 
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    }

    .summary-title {
      text-align: center;
      font-size: 1.8rem;
      margin-bottom: 28px;
      color: #2d2d2d;
    }

    .empty-cart {
      text-align: center;
      padding: 40px 0;
      color: #8e8e8e;
      font-size: 1.1rem;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      margin-bottom: 12px;
      border-radius: 12px;
      background-color: #f9f7f5;
    }

    .item-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .product-thumb {
      width: 56Spx;
      height: 56px;
      border-radius: 10px;
      object-fit: cover;
      border: 1px solid #eee;
      background-color: #f9f9f9;
    }

    .item-info {
      display: flex;
      flex-direction: column;
    }

    .item-name {
      font-weight: 600;
      color: #2d2d2d;
    }

    .item-qty-price {
      font-size: 0.9rem;
      color: #8e8e8e;
    }

    .summary-total {
      margin-top: 20px;
      text-align: right;
      font-size: 1.2rem;
      font-weight: 700;
      color: #A67C52;
    }

    .summary-actions {
      margin-top: 20px;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .btn-back {
      background-color: #a67c52 !important;
      color: #ffffff !important;
      font-weight: 600;
    }

     .btn-back:hover {
      background-color: #ffffff !important;
      color: #a67c52 !important;
    }

    .btn-next {
      background-color: transparent !important;
      color: #a67c52 !important;
      font-weight: 600;
    }

    .btn-next:hover {
      background-color: #a67c52 !important;
      color: #ffff !important;
    }
  `],
  template: `
    <section class="summary-container">
      <mat-card class="summary-card">
        <h2 class="summary-title">Résumé du panier</h2>

        <ng-container *ngIf="items$ | async as items">

          <!-- Panier vide -->
          <div *ngIf="items.length === 0" class="empty-cart">
            Votre panier est vide
          </div>

        <div *ngIf="items.length > 0">
          <div *ngFor="let item of items" style="display:flex; justify-content:space-between; margin-bottom:8px; padding:8px; background: rgba(232, 222, 209); border-radius:8px;">
            <span>Produit ID: {{ item.productId }}</span>
            <span>Quantité: {{ item.quantity }}</span>
            <span>Prix: {{ (item.quantity * item.price) | number:'1.2-2' }} €</span>
          </div>

            <!-- Total -->
            <div class="summary-total">
              Total: {{ total$ | async | number:'1.2-2' }} €
            </div>

            <!-- Actions -->
            <div class="summary-actions">
              <button mat-raised-button routerLink="/shop/cart" class="btn-back">Retour au panier</button>
              <button mat-raised-button routerLink="/checkout/step2" class="btn-next">Suivant → Adresse</button>
            </div>
          </div>

        </ng-container>
      </mat-card>
    </section>
  `
})
export class Step1SummaryComponent {
  private store = inject(Store);

  items$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);
}
