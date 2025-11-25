import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-order-success',
  imports: [CommonModule, RouterModule],
  template: `
    <section style="min-height:100vh; display:flex; justify-content:center; align-items:center; background-color:#f3e8f7;">
      <div style="text-align:center; background-color:#e6cbe3ff; padding:40px; border-radius:12px;">
        <h2 style="color:#bc7ad6ff;"> Commande réussie !</h2>
        <p>Merci pour votre achat. Votre commande a été confirmée.</p>
        <p>ID de commande : <strong>{{ orderId }}</strong></p>
        <button routerLink="/" style="margin-top:20px; padding:10px 20px; background:#bc7ad6ff; color:white; border:none; border-radius:6px;">
          Retour à l’accueil
        </button>
      </div>
    </section>
  `
})
export class OrderSuccessComponent {
  orderId = Math.floor(Math.random() * 1000000);
}
