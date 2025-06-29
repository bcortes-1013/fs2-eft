import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Componente que lista los servicios disponibles y sus descripciones, con opción de contratación.
 */

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  /**
   * Servicio de autenticación que maneja la sesión del usuario.
   * Permite iniciar sesión, cerrar sesión, verificar si el superusuario está logueado y si es un superadmin.
   * También permite agregar nuevos superusuarios al sistema.
   */

  private sesionSubject = new BehaviorSubject<any>(this.getSesion());
  sesion$ = this.sesionSubject.asObservable();

  constructor() {
    const usuariosStr = localStorage.getItem('superusuarios');
    const usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    if (!usuariosStr || usuarios.length === 0) {
      const admin = {
        nombre: 'Admin',
        usuario: 'Admin Supertierra',
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
