import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { selectCartItems, selectCartTotal } from '../../state/carte/cart.selectors';

@Component({
  standalone: true,
  selector: 'app-step1-summary',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, FormsModule],
  template: `
  <section style="min-height:100vh; display:flex; justify-content:center; align-items:flex-start; background-color:#f3e8f7; padding-top:20px;">
    <mat-card style="padding:20px; max-width:600px; width:100%; background-color:#e6cbe3ff; border-radius:12px;">
      <h2 style="text-align:center; margin-bottom:20px; color:#bc7ad6ff;">Résumé du Panier</h2>

      <div *ngIf="items$ | async as items">
        <div *ngIf="items.length === 0" style="text-align:center; color:rgba(0,0,0,0.6); padding:24px;">
          Votre panier est vide.
        </div>

        <div *ngIf="items.length > 0">
          <div *ngFor="let item of items" style="display:flex; justify-content:space-between; margin-bottom:8px; padding:8px; background-color:#fdf0ff; border-radius:8px;">
            <span>Produit ID: {{ item.productId }}</span>
            <span>Quantité: {{ item.quantity }}</span>
            <span>Prix: {{ (item.quantity * item.price) | number:'1.2-2' }} €</span>
          </div>

          <div style="margin-top:16px; font-weight:600; text-align:right;">
            Total: {{ total$ | async | number:'1.2-2' }} €
          </div>

          <div style="margin-top:16px; display:flex; gap:10px; justify-content:flex-end;">
            <button mat-raised-button routerLink="/shop/cart" color="warn">Retour au panier</button>
            <button mat-raised-button routerLink="/shop/checkout/step2" color="primary">Suivant → Adresse</button>
          </div>
        </div>
      </div>
    </mat-card>
  </section>
  `
})
export class Step1SummaryComponent {
  private store = inject(Store);
  items$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);
}