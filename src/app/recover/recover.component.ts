import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {
  recoverForm!: FormGroup; // Formulario reactivo
  mensaje = '';
  error = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicialización del formulario con validación de email
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recuperar() {
    this.mensaje = '';
    this.error = '';

    if (this.recoverForm.invalid) {
      this.recoverForm.markAllAsTouched(); // <- Aquí fuerzas mostrar errores
      return;
    }

    const emailIngresado = this.recoverForm.value.email;
    const usuarios = JSON.parse(localStorage.getItem('superusuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === emailIngresado);

    if (!usuario) {
      this.error = 'Usuario no encontrado con ese correo';
    } else {
      this.mensaje = `Hola ${usuario.nombre}, tu contraseña es: ${usuario.password}`;
    }
  }

  get f() {
    return this.recoverForm.controls;
  }
}
