import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-order-success',
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  styles: [`
    .success-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .success-card {
      max-width: 500px;
      width: 100%;
      text-align: center;
      background: rgba(232, 222, 209, 0.88);
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    }

    .success-title {
      color: #a67c52;
      font-size: 2rem;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .success-message {
      font-size: 1.1rem;
      color: #2d2d2d;
      margin-bottom: 10px;
    }

    .order-id {
      font-weight: 700;
      color: #a67c52;
      margin-bottom: 20px;
    }

    .btn-home {
      background-color: #a67c52 !important;
      color: #ffffff !important;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 8px;
      transition: 0.3s;
      border: none;
      cursor: pointer;
    }

    .btn-home:hover {
      background-color: #a67c52 !important;
      color: #ffffff !important;
    }
  `],
  template: `
    <section class="success-container">
      <mat-card class="success-card">
        <h2 class="success-title">Commande réussie !</h2>
        <p class="success-message">Merci pour votre achat. Votre commande a été confirmée.</p>
        <p class="order-id">ID de commande : {{ orderId }}</p>
        <button mat-raised-button routerLink="/shop/products" class="btn-home">
          Retour à l’accueil
        </button>
      </mat-card>
    </section>
  `
})
export class OrderSuccessComponent {
  orderId = Math.floor(Math.random() * 1000000);
}
