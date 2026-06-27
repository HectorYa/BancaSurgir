import { Injectable, signal } from '@angular/core';
import { UserRole } from '../models/credito-prospera.model';

export interface AuthUser {
  nombre: string;
  email: string;
  role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<AuthUser | null>(this.loadFromStorage());

  readonly user = this._user.asReadonly();

  get role(): UserRole | null {
    return this._user()?.role ?? null;
  }

  get isAsesor(): boolean {
    return this._user()?.role === 'asesor';
  }

  get isCliente(): boolean {
    return this._user()?.role === 'cliente';
  }

  setRole(role: UserRole): void {
    const current = this._user();
    if (current) {
      const updated = { ...current, role };
      this._user.set(updated);
      localStorage.setItem('auth_user', JSON.stringify(updated));
    } else {
      // Demo: crear usuario temporal según rol
      const demo: AuthUser = {
        nombre: role === 'asesor' ? 'Asesor Demo' : 'Cliente Demo',
        email: role === 'asesor' ? 'asesor@surgir.com' : 'cliente@surgir.com',
        role
      };
      this._user.set(demo);
      localStorage.setItem('auth_user', JSON.stringify(demo));
    }
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem('auth_user');
  }

  private loadFromStorage(): AuthUser | null {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
