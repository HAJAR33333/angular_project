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
    <section style="min-height: 100vh; display:flex; justify-content:center; align-items:center; background-color:#f3e8f7;">
      <mat-card style="
        padding: 30px;
        max-width: 400px;
        width: 100%;
        background-color: #e6cbe3ff;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        border-radius: 12px;
        text-align: center;
      ">
        <h2 style="color:#bc7ad6ff; font-size:2rem; margin-bottom:20px;">Login</h2>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" style="width:100%; margin-bottom:15px;">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" />
          </mat-form-field>

          <mat-form-field appearance="fill" style="width:100%; margin-bottom:20px;">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" />
          </mat-form-field>

          <button mat-raised-button
                  type="submit"
                  [disabled]="loginForm.invalid"
                  style="
                    width:100%;
                    background-color:#8c3db5ff;
                    color:white;
                    font-weight:500;
                    transition: transform 0.2s;
                  "
                  (mouseenter)="hover($event)" 
                  (mouseleave)="leave($event)">
            Login
          </button>
        </form>

        <p *ngIf="error$ | async as error" style="color:red; margin-top:15px;">
          {{ error }}
        </p>
      </mat-card>
    </section>
  `
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
          this.router.navigate(['/shop/products'], { replaceUrl: true });
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
