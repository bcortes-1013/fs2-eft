import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

/**
  * Componente para el registro de nuevos superusuarios en el sistema.
  */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /**
   * Formulario reactivo que contiene los campos necesarios para el registro de un nuevo superusuario.
   * Incluye validaciones para nombre, usuario, email, fecha de nacimiento, contraseña y confirmación de contraseña.
   * También incluye validaciones personalizadas para asegurar que la edad mínima sea de 14 años y que las contraseñas coincidan.
   */

  registerForm!: FormGroup; // Formulario reactivo
  error: string = '';
  exito: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Inicializamos el formulario con validaciones
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.edadMinimaValidator]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password2: ['', Validators.required],
      envio: [''],
      noSoyAutomata: [false, Validators.requiredTrue]
    }, { validators: [this.passwordsIgualesValidator] }); // Validación personalizada
  }

  // Validación personalizada para edad mínima de 14 años
  edadMinimaValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null; // no valida si el campo está vacío

    const fecha = new Date(control.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }

    return edad < 14 ? { edadMinima: true } : null;
  }

  // Validación personalizada para contraseñas iguales
  passwordsIgualesValidator(group: AbstractControl): ValidationErrors | null {
    const pass1 = group.get('password')?.value;
    const pass2 = group.get('password2')?.value;
    return pass1 === pass2 ? null : { contrasenasNoCoinciden: true };
  }

  registrar() {
    this.error = '';
    this.exito = '';

    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { nombre, usuario, email, password } = this.registerForm.value;

    const nuevoUsuario = {
      nombre,
      usuario,
      email,
      password,
      tipo: 'superusuario'
    };

    const usuarios = JSON.parse(localStorage.getItem('superusuarios') || '[]');
    usuarios.push(nuevoUsuario);
    localStorage.setItem('superusuarios', JSON.stringify(usuarios));

    this.exito = 'Usuario registrado con éxito. Ahora puedes iniciar sesión.';
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }

  // Accesos rápidos a los campos del formulario desde la vista
  get f() {
    return this.registerForm.controls;
  }
}
