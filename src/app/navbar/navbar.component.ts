import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

  /**
   * Barra de navegación principal del sitio, con acceso a distintas secciones como login, home y carrito.
   */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  /**
   * Objeto que representa la sesión del usuario actual.
   * Contiene información como si el usuario está logueado, su nombre de usuario y su tipo (superusuario o superadmin).
   */

  sesion: any = null;

  /**
   * Constructor para las dependencias del componente.
   * @param auth Servicio de autenticación que maneja el estado de la sesión del usuario.
   * @param router Router para navegar entre las diferentes rutas de la aplicación.
   */

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.sesion$.subscribe(sesion => {
      this.sesion = sesion;
    });
  }
  
  cerrarSesion() {
    console.log("Cerrando sesión");
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }
}
