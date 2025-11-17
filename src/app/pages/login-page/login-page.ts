import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from '../../state/auth/auth.actions';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div style="max-width: 400px; margin: 50px auto;">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" style="width:100%">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" />
        </mat-form-field>

        <mat-form-field appearance="fill" style="width:100%">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" />
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
          Login
        </button>
      </form>
    </div>
  `
})
export class LoginPageComponent {
  loginForm;
  private router = inject(Router);


  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      username: ['demo', Validators.required],
      password: ['demo', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      this.store.dispatch(AuthActions.login({ username, password }));
      this.router.navigate(['/']);
    }
  }
}
