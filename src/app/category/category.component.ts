import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  category = '';
  items: any[] = [];

  private datos: any = {
    armaduras: [
      { formatoImg: 'img-armaduras', titulo: 'B-27 Comando Fortificado', imagen: 'assets/img/armadura/b27.webp', precio: 3500, descripcion: 'Proporciona una excelente protección contra el daño y es ideal para misiones de asalto. Su diseño robusto proporciona movilidad reducida en el campo de batalla'},
      { formatoImg: 'img-armaduras', titulo: 'CE-81 Juggernaut', imagen: 'assets/img/armadura/ce81.webp', precio: 3000, descripcion: 'Al contar con menor blindaje, esta armadura permite una movilidad excepcional. Ideal para misiones de infiltración y combate a corta distancia' },
      { formatoImg: 'img-armaduras', titulo: 'DP-40 Héroe de la federación', imagen: 'assets/img/armadura/dp40.webp', precio: 2500, descripcion: 'Balance entre protección y movilidad. Ideal para misiones de asalto y defensa. Su diseño versátil permite adaptarse a diferentes situaciones de combate' }
    ],
    armamento: [
      { formatoImg: 'img-armamento', titulo: 'Rompedora Incendiaria', imagen: 'assets/img/armamento/breaker.png', precio: 1500, descripcion: 'Con una excelente capacidad y daño constante de fuego, esta arma es ideal contra grupos de enemigos con poco blindaje' },
      { formatoImg: 'img-armamento', titulo: 'Dominador JAR', imagen: 'assets/img/armamento/dominator.png', precio: 2500, descripcion: 'A pesar de su poca capacidad, su potencia de fuego es devastadora. Ideal para eliminar enemigos blindados y objetivos de alto valor' },
      { formatoImg: 'img-armamento', titulo: 'PLAS-101 Purificador', imagen: 'assets/img/armamento/plas101.png', precio: 2000, descripcion: 'Con capacidad limitada, proporciona daño de área y daño adicional a enemigos blindados. Devastadora contra grupos de enemigos y objetivos blindados' }
    ],
    estratagemas: [
      { formatoImg: 'img-estratagemas', titulo: 'Laser Orbital', imagen: 'assets/img/estratagema/laser.png', precio: 4500, descripcion: 'El superdestructor proporciona un ataque de láser devastador desde el espacio, ideal para eliminar grandes grupos de enemigos o estructuras enemigas' },
      { formatoImg: 'img-estratagemas', titulo: 'Mortero', imagen: 'assets/img/estratagema/mortero.png', precio: 3500, descripcion: 'Unidad de apoyo en tierra, el mortero proporciona un ataque de artillería de largo alcance que fija objetivos automáticamente con un gran daño de área' },
      { formatoImg: 'img-estratagemas', titulo: 'Cañón Quasar', imagen: 'assets/img/estratagema/quasar.png', precio: 3000, descripcion: 'Arma de apoyo, con una lenta recarga y un único disparo se compensa con un daño masivo además de un gran alcance, incluso para derribar naves y tanques' }
    ],
    superdestructor: [
      { formatoImg: 'img-superdestructor', titulo: 'Orbital', imagen: 'assets/img/superdestructor/orbital.webp', precio: 7000, descripcion: 'Aumenta los llamados de armas orbitales, además aumenta el radio de ataque en un 50% y el daño en un 25%' },
      { formatoImg: 'img-superdestructor', titulo: 'Puente', imagen: 'assets/img/superdestructor/puente.webp', precio: 6000, descripcion: 'Disminuye el tiempo de despliegue de apoyos robóticos y armas de apoyo en un 15%, además las cápsulas Hell causan una explosión al aterrizar' },
      { formatoImg: 'img-superdestructor', titulo: 'Robótico', imagen: 'assets/img/superdestructor/roboticos.webp', precio: 6500, descripcion: 'Disminuye el tiempo de despliegue de unidades robóticas y aumenta su efectividad en combate, fijando objetivos más rápido' },
      { formatoImg: 'img-superdestructor', titulo: 'Póster de Balatro Balatrez', imagen: 'assets/img/superdestructor/jimbo.webp', precio: 1, descripcion: 'No proporciona mejoras, pero se ve bien pegado en la ventana de tu nave' }
    ]
  };

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) { }

  sesion: any = null;

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    this.route.params.subscribe(params => {
      this.category = params['nombre'];
      this.items = this.datos[this.category] || [];
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
