import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal } from '../../state/carte/cart.selectors';
import { clearCart } from '../../state/carte/cart.actions';

@Component({
  standalone: true,
  selector: 'app-step3-confirm',
  imports: [CommonModule, RouterModule],
  template: `
    <section style="min-height:100vh; display:flex; justify-content:center; align-items:flex-start; background-color:#f3e8f7; padding-top:20px;">
      <div style="padding:20px; max-width:600px; width:100%; background-color:#e6cbe3ff; border-radius:12px;">

        <h2 style="text-align:center; margin-bottom:20px; color:#bc7ad6ff;">
          Confirmation
        </h2>

        <div *ngIf="items$ | async as items">
          <div *ngIf="items.length === 0">
            Votre panier est vide.
          </div>

          <div *ngIf="items.length > 0">

            <h3 style="margin-bottom:10px;">Articles :</h3>
            <div *ngFor="let item of items" style="margin-bottom:8px;">
              - Produit {{ item.productId }} × {{ item.quantity }}
            </div>

            <div style="margin-top:16px;">
              <strong>Total: {{ total$ | async | number:'1.2-2' }} €</strong>
            </div>

            <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:20px;">
              <button routerLink="/checkout/step2">
                ← Retour
              </button>

              <button (click)="confirmOrder()">
                Confirmer la commande
              </button>
            </div>
          </div>
        </div>
      </div>
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
    //alert(" Commande confirmée avec succès !");
    this.router.navigate(['/checkout/success']);
  }
}
