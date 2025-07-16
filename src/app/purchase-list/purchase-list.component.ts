import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent {
  historialFiltrado: any[] = [];

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (sesion?.logueado) {
      this.cargarHistorial();
    }
  }

  cargarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial') || '[]');
    console.log(historial);
    this.historialFiltrado = historial.filter((item: any) => item.usuario === JSON.parse(localStorage.getItem('sesion') || '{}').usuario);
    console.log(this.historialFiltrado);
  }

  getTotal(compra: any[]): number {
    if (!compra || !Array.isArray(compra)) {
      return 0;
    }
    return compra.reduce((total, p) => total + (p.cantidad * p.precio), 0);
  }
}
