import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
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
