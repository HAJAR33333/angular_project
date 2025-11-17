import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient);

  login(username: string, password: string): Observable<{ access: string; refresh: string }> {
    return this.http.post<{ access: string; refresh: string }>(
      '/api/auth/token/',
      { username, password }
    );
  }
}
