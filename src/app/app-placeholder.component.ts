import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <section class="page">
      <mat-card class="card">

        <mat-icon class="icon">shopping_bag</mat-icon>

        <h2>App Shop</h2>

        <p class="subtitle">
          Plateforme e-commerce moderne conçue pour tester l’architecture,
          l’UI Material et les flux utilisateurs.
        </p>

        <ul class="features">
          <li>✔ Authentification & rôles</li>
          <li>✔ Catalogue produits</li>
          <li>✔ Panier & commandes</li>
          <li>✔ Zone développeur</li>
        </ul>

        <div class="actions">
          <button mat-raised-button class="btn-login" routerLink="/shop/products">
            Decouvrir les produits
          </button>

          <button mat-stroked-button class="btn-dev" routerLink="/dev">
            Zone développeur
          </button>
        </div>

      </mat-card>
    </section>
  `,
  styles: [`
    .page {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
}


    .card {
      max-width: 520px;
      width: 100%;
      padding: 32px;
      text-align: center;
      border-radius: 14px;
      background: #e8ded1e6;
      box-shadow: 0 0.5px 10px  #00E5FF;
    }

    .icon {
      font-size: 48px;
      color: #A67C52;
      margin-bottom: 12px;
    }

    h2 {
      margin: 0;
      font-size: 2rem;
      color: #ffff;
    }

    .subtitle {
      margin: 16px 0 24px;
      color: #8E8E8E;
      font-size: 0.95rem;
    }

    .features {
      list-style: none;
      padding: 0;
      margin-bottom: 28px;
      color: #8E8E8E;
      text-align: left;
      display: inline-block;
    }

    .features li {
      margin: 6px 0;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .btn-login{
      color: #e2dcd3ff !important;
      background-color: #A67C52 !important;
    }

    .btn-login:hover {
      color: #A67C52 !important ;
      background-color: transparent !important; 
    }

    .btn-dev{
      color: #A67C52 !important;
      background-color: rgba(255, 0, 0, 0);
    }

    .btn-dev:hover {
      color: #e2dcd3ff !important ;
      background-color: #A67C52 !important ;
    }
  `]
})
export class AppPlaceholderComponent {}
