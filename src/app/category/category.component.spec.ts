import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalComponent } from '../modal/modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      declarations: [CategoryComponent, ModalComponent],
      imports: [RouterTestingModule, HttpClientTestingModule ]
    });
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('agrega un item al supercarrito cuando es un superusuario', () => {
    // Simular sesión en localStorage
    localStorage.setItem('sesion', JSON.stringify({ tipo: 'superusuario', email: 'test@example.com' }));

    component.category = 'deportes';

    const item = { titulo: 'Pelota', precio: 1000 };

    component.agregarAlCarrito(item);

    const carritoStr = localStorage.getItem('carrito_test@example.com');
    expect(carritoStr).toBeTruthy();

    const carrito = JSON.parse(carritoStr!);
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Pelota');
    expect(carrito[0].cantidad).toBe(1);
  });

  it('Muestra una alerta cuando no es superusuario y está intentando agregar al carrito', () => {
    spyOn(window, 'alert');  // Espía el método alert para verificar si fue llamado

    // Simular sesión inválida (tipo diferente)
    localStorage.setItem('sesion', JSON.stringify({ tipo: 'usuario', email: 'user@example.com' }));

    const item = { titulo: 'Pelota', precio: 1000 };

    component.agregarAlCarrito(item);

    expect(window.alert).toHaveBeenCalledWith('Debes iniciar sesión como usuario para agregar al carrito.');

    // Asegurarse que no haya carrito creado
    const carritoStr = localStorage.getItem('carrito_user@example.com');
    expect(carritoStr).toBeNull();
  });
});
