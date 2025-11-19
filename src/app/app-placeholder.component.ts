import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [RouterModule, MatButtonModule, MatCardModule],
  template: `
    <section style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #f3e8f7;">
      <mat-card style="
        padding: 30px;
        max-width: 600px;
        width: 100%;
        background-color: #e6cbe3ff;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        border-radius: 12px;
        text-align: center;
      ">
        <h2 style="color: #bc7ad6ff; font-size: 2.2rem; margin-bottom: 10px;">
          App Shop — Placeholder
        </h2>
        <p style="color: #570072ff; font-size: 1rem; margin-bottom: 30px;">
          Ici viendra l’UI cohérente (login, liste produits, avis...).
        </p>

        <nav style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;">
          <button 
            mat-raised-button
            routerLink="/dev"
            style="
              background-color: #bc7ad6ff;
              color: white;
              font-weight: 500;
              transition: transform 0.2s;
            "
            (mouseenter)="hover($event)" 
            (mouseleave)="leave($event)">
            → Aller à la zone de tests
          </button>

          <button 
            mat-raised-button
            routerLink="/"
            style="
              background-color: #a95fc0ff;
              color: white;
              font-weight: 500;
              transition: transform 0.2s;
            "
            (mouseenter)="hover($event)" 
            (mouseleave)="leave($event)">
            ← Retour accueil
          </button>

          <button 
            mat-raised-button
            routerLink="/login"
            style="
              background-color: #8c3db5ff;
              color: white;
              font-weight: 500;
              transition: transform 0.2s;
            "
            (mouseenter)="hover($event)" 
            (mouseleave)="leave($event)">
            Login
          </button>
        </nav>
      </mat-card>
    </section>
  `,
})
export class AppPlaceholderComponent {
  hover(event: any) {
    event.target.style.transform = 'scale(1.05)';
  }
  leave(event: any) {
    event.target.style.transform = 'scale(1)';
  }
}
