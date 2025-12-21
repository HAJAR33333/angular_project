import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-step2-address',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule
  ],
  styles: [`
    .address-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 40px;
    }

    .address-card {
      max-width: 650px;
      width: 100%;
      padding: 28px;
      border-radius: 16px;
      background: rgba(232, 222, 209, 0.88); 
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    }

    .address-title {
      text-align: center;
      font-size: 1.8rem;
      margin-bottom: 28px;
      color: #2d2d2d;
    }

    .address-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .address-form input {
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #a67c52;
      font-size: 1rem;
      outline: none;
      transition: 0.3s;
    }

    .address-form input.ng-invalid.ng-touched {
      border-color: red;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 20px;
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

    .btn-next {
      background-color: transparent !important;
      color: #a67c52 !important;
      font-weight: 600;
      transition: 0.3s;
    }

    .btn-next:hover {
      background-color: #a67c52 !important;
      color: #ffffff !important;
    }

    .error-msg {
      color: red;
      font-size: 0.85rem;
    }
  `],
  template: `
    <section class="address-container">
      <mat-card class="address-card">
        <h2 class="address-title">Adresse de livraison</h2>

        <form class="address-form" [formGroup]="addressForm" (ngSubmit)="submit()">
          <input type="text" placeholder="Nom & Prénom" formControlName="fullName"/>
          <div *ngIf="addressForm.get('fullName')?.touched && addressForm.get('fullName')?.invalid" class="error-msg">
            Ce champ est obligatoire
          </div>

          <input type="text" placeholder="Adresse" formControlName="address"/>
          <div *ngIf="addressForm.get('address')?.touched && addressForm.get('address')?.invalid" class="error-msg">
            Ce champ est obligatoire
          </div>

          <input type="text" placeholder="Ville" formControlName="city"/>
          <div *ngIf="addressForm.get('city')?.touched && addressForm.get('city')?.invalid" class="error-msg">
            Ce champ est obligatoire
          </div>

          <input type="text" placeholder="Code postal" formControlName="zipCode"/>
          <div *ngIf="addressForm.get('zipCode')?.touched && addressForm.get('zipCode')?.invalid" class="error-msg">
            Ce champ est obligatoire
          </div>

          <div class="form-actions">
            <button mat-raised-button routerLink="/checkout/step1" class="btn-back" type="button">← Retour</button>
            <button mat-raised-button class="btn-next" type="submit" [disabled]="addressForm.invalid">Continuer →</button>
          </div>
        </form>
      </mat-card>
    </section>
  `
})
export class Step2AddressComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  addressForm!: FormGroup;

  ngOnInit() {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  submit() {
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
      this.router.navigate(['/checkout/step3']);
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
}
