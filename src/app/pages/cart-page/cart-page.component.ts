import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartCount } from '../../state/carte/cart.selectors';
import { updateQuantity, removeFromCart, clearCart } from '../../state/carte/cart.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cart-page',
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, RouterModule     ],
  template: `
    <section style="min-height:100vh; display:flex; justify-content:center; align-items:flex-start; background-color:#f3e8f7; padding-top:20px;">
      <mat-card style="padding:20px; max-width:600px; width:100%; background-color:#e6cbe3ff; border-radius:12px;">
        <h2 style="text-align:center; margin-bottom:20px; color:#bc7ad6ff;">Mon Panier</h2>

        <div *ngIf="items$ | async as items">
          <div *ngIf="items.length === 0" style="text-align:center; color:rgba(0,0,0,0.6); padding:24px;">
            Votre panier est vide.
          </div>

          <div *ngIf="items.length > 0">
            <div *ngFor="let item of items" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding:8px; background-color:#fdf0ff; border-radius:8px;">
              <span>Produit ID: {{ item.productId }}</span>
              <input type="number" [value]="item.quantity" (change)="changeQuantity(item.productId, $any($event.target).value)" style="width:60px;"/>
              <button mat-stroked-button color="warn" (click)="remove(item.productId)">Supprimer</button>
            </div>

            <div style="margin-top:16px; font-weight:600;">Total articles: {{ totalCount$ | async }}</div>

            <div style="margin-top:16px; display:flex; gap:10px;">
              <button mat-raised-button color="primary" (click)="clear()">Vider le panier</button>
              <button mat-raised-button color="accent" routerLink="/checkout/step1">Passer à la commande</button>
            </div>
          </div>
        </div>
      </mat-card>
    </section>
  `
})
export class CartPageComponent {
  private store = inject(Store);

  items$: Observable<any[]> = this.store.select(selectCartItems);
  totalCount$: Observable<number> = this.store.select(selectCartCount);

  changeQuantity(productId: number, qtyStr: string) {
    const qty = Math.max(1, Number(qtyStr) || 1);
    this.store.dispatch(updateQuantity({ productId, quantity: qty }));
  }

  remove(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }

  clear() {
    this.store.dispatch(clearCart());
  }
}