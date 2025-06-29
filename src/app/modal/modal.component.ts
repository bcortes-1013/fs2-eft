import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Componente reutilizable para mostrar ventanas modales con información.
 */

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  /**
   * Título del modal que se mostrará en la parte superior.
   */

  @Input() titulo: string = ''; 
  @Input() visible: boolean = false;

  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}
