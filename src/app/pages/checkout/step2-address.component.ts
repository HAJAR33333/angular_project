import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-step2-address',
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section style="min-height:100vh; display:flex; justify-content:center; align-items:flex-start; background-color:#f3e8f7; padding-top:20px;">
      <div style="padding:20px; max-width:600px; width:100%; background-color:#e6cbe3ff; border-radius:12px;">
        <h2 style="text-align:center; margin-bottom:20px; color:#bc7ad6ff;">
          Adresse de livraison
        </h2>

        <form style="display:flex; flex-direction:column; gap:12px;">
          <input type="text" placeholder="Nom & Prénom" style="padding:10px; border-radius:6px;"/>
          <input type="text" placeholder="Adresse" style="padding:10px; border-radius:6px;"/>
          <input type="text" placeholder="Ville" style="padding:10px; border-radius:6px;"/>
          <input type="text" placeholder="Code postal" style="padding:10px; border-radius:6px;"/>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:10px;">
            <button routerLink="/checkout/step1">
              ← Retour
            </button>
            <button routerLink="/checkout/step3">
              Continuer →
            </button>
          </div>
        </form>
      </div>
    </section>
  `
})
export class Step2AddressComponent {}
