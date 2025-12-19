import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from '../../state/auth/auth.actions';
import { selectIsLoggedIn, selectAuthError } from '../../state/auth/auth.selectors';
import { tap } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <section class="page">
      <div class="overlay"></div>

      <mat-card class="login-card">
        <h2>Veuillez vous conneter pour passer au panier </h2>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" />
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" />
          </mat-form-field>

          <button
            mat-raised-button
            type="submit"
            [disabled]="loginForm.invalid"
            class="btn-login"
            (mouseenter)="hover($event)"
            (mouseleave)="leave($event)"
          >
            Login
          </button>
        </form>

        <p *ngIf="error$ | async as error" class="error">
          {{ error }}
        </p>
      </mat-card>
    </section>
  `,
  styles: [`
    .page {
      position: relative;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url('/login-bg.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.35);
    }

    .login-card {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 400px;
      padding: 32px;
      border-radius: 14px;
      background: rgba(232, 222, 209, 0.9); 
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(4px);
      text-align: center;
    }

    h2 {
      margin: 0 0 20px 0;
      font-size: 2rem;
      color: #ffff;
    }

    .mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .btn-login {
      width: 100%;
      padding: 12px;
      font-weight: 500;
      color: #FFFFFF !important; 
      background-color: #A67C52 !important; 
      transition: all 0.2s ease-in-out;
    }

    .btn-login:hover {
      color: #A67C52;
      background-color: rgba(255, 255, 255, 0.2);
    }

    .error {
      margin-top: 16px;
      color: #D32F2F; 
      font-size: 0.9rem;
    }

    input.mat-input-element {
      color: #2D2D2D; 
    }
  `]
})
export class LoginPageComponent implements OnInit {
  loginForm;
  private store = inject(Store);
  private router = inject(Router);

  error$ = this.store.select(selectAuthError);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['demo', Validators.required],
      password: ['demo', Validators.required],
    });
  }

  ngOnInit() {
    this.store.select(selectIsLoggedIn)
      .pipe(
        tap(loggedIn => {
          if (loggedIn) {
            this.router.navigate(['/shop/cart'], { replaceUrl: true });
          }
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      this.store.dispatch(AuthActions.login({ username, password }));
    }
  }

  hover(event: any) {
    event.target.style.transform = 'scale(1.05)';
  }

  leave(event: any) {
    event.target.style.transform = 'scale(1)';
  }
}
