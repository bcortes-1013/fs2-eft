import { Component } from '@angular/core';

/**
 * Componente que muestra y permite editar la información del perfil del superusuario.
 */

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  /**
   * Objeto que representa la sesión del usuario actual.
   * Contiene información como el nombre de usuario, tipo de usuario y otros datos relevantes.
   * Se carga desde el almacenamiento local al iniciar el componente.
   */

  sesion: any = null;
  usuarioActivo: any = null;
  usuarios: any[] = [];
  mensaje = '';

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    const usuariosStr = localStorage.getItem('superusuarios');
    this.usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    console.log("Usuarios", this.usuarios);
    console.log("Sesion", this.sesion);

    // Buscar usuario completo y sincronizar
    const usuarioEncontrado = this.usuarios.find(u => u.usuario === this.sesion.usuario);
    if (usuarioEncontrado) {
      this.usuarioActivo = { ...usuarioEncontrado };
    }
  }

  guardarCambios() {
    const index = this.usuarios.findIndex(u => u.usuario === this.usuarioActivo.usuario);

    if (index !== -1) {
      this.sesion.usuario = this.usuarioActivo.usuario;
      this.sesion.nombre = this.usuarioActivo.nombre;

      this.usuarios[index] = { ...this.usuarioActivo };
      localStorage.setItem('superusuarios', JSON.stringify(this.usuarios));
      localStorage.setItem('sesion', JSON.stringify(this.sesion));
      this.mensaje = 'Datos actualizados';
      setTimeout(() => window.location.reload(), 2000);
    }
  }
}
