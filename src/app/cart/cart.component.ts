import { Component } from '@angular/core';

/**
 * Componente que muestra el carrito de compras del usuario. Permite revisar y eliminar productos seleccionados.
 */

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  /**
   * Lista de productos en el carrito, cargada desde el almacenamiento local.
   * Cada producto tiene un nombre, precio y cantidad.
   */

  carrito: any[] = [];
  total = 0;
  claveCarrito = '';
  visible: boolean = false;

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (sesion?.logueado) {
      this.claveCarrito = 'carrito_' + sesion.email;
      this.cargarCarrito();
    }
  }

  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem(this.claveCarrito) || '[]');
    this.total = this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  eliminar(index: number) {
    this.carrito.splice(index, 1);
    localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  vaciarCarrito() {
    localStorage.removeItem(this.claveCarrito);
    this.cargarCarrito();
  }

  comprar() {
    const audio = new Audio('assets/sound/sonido_exito.mp3');
    audio.play().catch(e => console.error('Error al reproducir sonido:', e));
    this.visible = true;

    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    const registroCompra = {
      usuario: sesion.usuario,
      compra: this.carrito,
    };

    const historial = JSON.parse(localStorage.getItem('historial') || '[]');
    historial.push(registroCompra);
    localStorage.setItem('historial', JSON.stringify(historial));

    this.vaciarCarrito();
  }

  actualizarCantidad(index: number, nuevaCantidad: number) {
    if (nuevaCantidad < 1) return;

    this.carrito[index].cantidad = nuevaCantidad;
    localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  cerrarModal() {
    this.visible = false;
  }
}
