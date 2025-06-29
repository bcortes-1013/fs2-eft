import { Component } from '@angular/core';

/**
 * Componente para la gestión del panel de administración. Permite visualizar y ejecutar acciones con los usuarios.
 */

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  /**
   * Lista de usuarios superadministradores cargados desde el almacenamiento local.
   */

  usuarios: any[] = [];

  ngOnInit(): void {
    const data = localStorage.getItem('superusuarios');
    if (data) {
      this.usuarios = JSON.parse(data);
    }
  }

  eliminarUsuario(correo: string): void {
    this.usuarios = this.usuarios.filter(u => u.email !== correo);
    localStorage.setItem('superusuarios', JSON.stringify(this.usuarios));
  }
}
