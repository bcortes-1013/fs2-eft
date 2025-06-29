import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Componente de autenticación que permite a los usuarios iniciar sesión en el sistema.
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Formulario reactivo que contiene los campos de email y contraseña.
   */

  loginForm!: FormGroup; // Formulario reactivo
  error: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // Creamos el formulario con dos campos obligatorios
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Método para acceder fácilmente a los controles desde la vista
  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.error = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const usuarios = JSON.parse(localStorage.getItem('superusuarios') || '[]');

    const usuario = usuarios.find((u: any) =>
      u.email === email && u.password === password
    );

    if (usuario) {
      localStorage.setItem('sesion', JSON.stringify({
        logueado: true,
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        tipo: usuario.tipo || 'superusuario'
      }));

      window.location.href = usuario.tipo === 'superadmin' ? '/admin' : '/perfil';
    } else {
      this.error = true;
    }
  }
}