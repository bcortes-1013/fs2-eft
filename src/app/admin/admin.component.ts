import { Component } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';

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
  ventas: any[] = [];
  error: any = null;

  constructor(private saleService: SaleService) {}


  ngOnInit(): void {
    const data = localStorage.getItem('superusuarios');
    if (data) {
      this.usuarios = JSON.parse(data);
    }
    this.saleService.getVentas().subscribe({
      next: (res) => this.ventas = res,
      error: (err) => this.error = err
    });
  }

  eliminarUsuario(correo: string): void {
    this.usuarios = this.usuarios.filter(u => u.email !== correo);
    localStorage.setItem('superusuarios', JSON.stringify(this.usuarios));
  }
}
