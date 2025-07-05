import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

/**
 * Componente que maneja la visualización de categorías.
 */

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  /**
   * Categoría actual seleccionada por el usuario.
   * Se obtiene de la ruta activa y se usa para filtrar los elementos a mostrar.
   */

  category: string = '';
  items: any[] = [];
  allData: any = {}; // el JSON completo
  error: any = null;

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router, private categoryService: CategoryService) {};

  sesion: any = null;

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.allData = data;

        // Obtener categoría desde la URL
        this.route.params.subscribe(params => {
          this.category = params['nombre'];
          this.items = this.allData[this.category] || [];
        });
      },
      error: (err) => this.error = err
    });
  }


  agregarAlCarrito(item: any) {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (!sesion || sesion.tipo !== 'superusuario') {
      alert('Debes iniciar sesión como usuario para agregar al carrito.');
      return;
    }

    const claveCarrito = 'carrito_' + sesion.email;
    const carritoStr = localStorage.getItem(claveCarrito);
    const carrito = carritoStr ? JSON.parse(carritoStr) : [];

    const index = carrito.findIndex((index: any) => index.nombre === item.titulo);

    if (index >= 0) {
      carrito[index].cantidad++;
    } else {
      carrito.push({
        nombre: item.titulo,
        category: this.category,
        precio: item.precio,
        cantidad: 1
      });
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));

    this.verCategoria(item.titulo);
  }

  // Modal
  tituloAgregado: string = '';
  mostrarModal: boolean = false;

  verCategoria(titulo: string) {
    this.tituloAgregado = titulo;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}
