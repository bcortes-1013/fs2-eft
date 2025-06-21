import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  sesion: any = null;
  usuarios: any[] = [];
  mensaje = '';

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    const usuariosStr = localStorage.getItem('superusuarios');
    this.usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    // Buscar usuario completo y sincronizar
    const usuarioEncontrado = this.usuarios.find(u => u.usuario === this.sesion.usuario);
    if (usuarioEncontrado) {
      this.sesion = { ...usuarioEncontrado };
    }
  }

  guardarCambios() {
    const index = this.usuarios.findIndex(u => u.usuario === this.sesion.usuario);
    if (index !== -1) {
      this.usuarios[index] = { ...this.sesion };
      localStorage.setItem('superusuarios', JSON.stringify(this.usuarios));
      localStorage.setItem('sesion', JSON.stringify(this.sesion));
      this.mensaje = 'Datos actualizados';
    }
  }
}
