import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserRole } from '../models/credito-prospera.model';

export interface AuthUser {
  nombre: string;
  email: string;
  role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
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
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('auth_user', JSON.stringify(updated));
      }
    } else {
      // Demo: crear usuario temporal según rol
      const demo: AuthUser = {
        nombre: role === 'asesor' ? 'Asesor Demo' : 'Cliente Demo',
        email: role === 'asesor' ? 'asesor@surgir.com' : 'cliente@surgir.com',
        role
      };
      this._user.set(demo);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('auth_user', JSON.stringify(demo));
      }
    }
  }

  logout(): void {
    this._user.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_user');
    }
  }

  private loadFromStorage(): AuthUser | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
