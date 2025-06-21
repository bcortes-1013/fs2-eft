import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private sesionSubject = new BehaviorSubject<any>(this.getSesion());
  sesion$ = this.sesionSubject.asObservable();

  constructor() {
    const usuariosStr = localStorage.getItem('superusuarios');
    const usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    if (!usuariosStr || usuarios.length === 0) {
      const admin = {
        nombre: 'Admin',
        email: 'admin@supertierra.com',
        password: 'Admin123',
        tipo: 'superadmin'
      };
      localStorage.setItem('superusuarios', JSON.stringify([admin]));
    }
  }

  getSesion() {
    const sesion = localStorage.getItem('sesion');
    return sesion ? JSON.parse(sesion) : null;
  }

  estaLogueado(): boolean {
    const sesion = this.getSesion();
    return sesion?.logueado || false;
  }

  esAdmin(): boolean {
    const sesion = this.getSesion();
    return sesion?.tipo === 'superadmin';
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.sesionSubject.next(null); // 🔁 actualiza para los suscriptores
  }

  iniciarSesion(sesionData: any): void {
    localStorage.setItem('sesion', JSON.stringify(sesionData));
    this.sesionSubject.next(sesionData); // 🔁 notifica cambios
  }

  addUser(user: any): boolean {
    const usuarios = JSON.parse(localStorage.getItem('superusuarios') || '[]');
    const existe = usuarios.some((u: any) => u.email === user.email);
    if (existe) return false;
    usuarios.push(user);
    localStorage.setItem('superusuarios', JSON.stringify(usuarios));
    return true;
  }
}
