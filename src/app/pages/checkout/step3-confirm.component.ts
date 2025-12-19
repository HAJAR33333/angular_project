import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal } from '../../state/carte/cart.selectors';
import { clearCart } from '../../state/carte/cart.actions';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-step3-confirm',
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  styles: [`
    .confirm-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 40px;
    }

    .confirm-card {
      max-width: 650px;
      width: 100%;
      padding: 28px;
      border-radius: 16px;
      background: rgba(232, 222, 209, 0.88); 
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    }

    .confirm-title {
      text-align: center;
      font-size: 1.8rem;
      margin-bottom: 28px;
      color: #2d2d2d;
    }

    .confirm-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      width: 50px;
      height: 50px;
      border-radius: 8px;
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

    .total {
      margin-top: 20px;
      text-align: right;
      font-size: 1.2rem;
      font-weight: 700;
      color: #A67C52;
    }

    .actions {
      margin-top: 20px;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .btn-back {
      background-color: #a67c52 !important;
      color: #ffffff !important;
      font-weight: 600;
      transition: 0.3s;
    }

    .btn-back:hover {
      background-color: #ffffff !important;
      color: #a67c52 !important;
    }

    .btn-confirm {
      background-color: transparent !important;
      color: #a67c52 !important;
      font-weight: 600;
      transition: 0.3s;
    }

    .btn-confirm:hover {
      background-color: #a67c52 !important;
      color: #ffffff !important;
    }
  `],
  template: `
    <section class="confirm-container">
      <mat-card class="confirm-card">
        <h2 class="confirm-title">Confirmation de la commande</h2>

        <div *ngIf="items$ | async as items">
          <div *ngIf="items.length === 0" style="text-align:center; color:#8e8e8e; padding:24px;">
            Votre panier est vide.
          </div>

          <div *ngIf="items.length > 0">

            <h3 style="margin-bottom:10px;">Articles :</h3>
            <div *ngFor="let item of items" style="margin-bottom:8px;">
              - Produit {{ item.productId }} × {{ item.quantity }}
            </div>

            <div class="total">
              Total: {{ total$ | async | number:'1.2-2' }} €
            </div>

            <div class="actions">
              <button mat-raised-button routerLink="/checkout/step2" class="btn-back">← Retour</button>
              <button mat-raised-button (click)="confirmOrder()" class="btn-confirm">Confirmer la commande</button>
            </div>
          </div>
        </div>
      </mat-card>
    </section>
  `
})
export class Step3ConfirmComponent {

  private store = inject(Store);
  private router = inject(Router);

  items$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);

  confirmOrder() {
    this.store.dispatch(clearCart());
    this.router.navigate(['/checkout/success']);
  }
}
