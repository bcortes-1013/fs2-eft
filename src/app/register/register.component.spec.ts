import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, FormsModule], // IMPORTANTE
      providers: [FormBuilder] // Si usas this.fb en el componente
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 1
  it('debería crear el formulario correctamente', () => {
    expect(component.registerForm).toBeDefined();
  });

  // TEST 2
  it('debería marcar "nombre" como inválido si está vacío', () => {
    const nombreControl = component.registerForm.get('nombre');
    nombreControl?.setValue('');
    expect(nombreControl?.valid).toBeFalse();
    expect(nombreControl?.errors?.['required']).toBeTrue();
  });

  // TEST 3
  it('debería marcar "usuario" como inválido si tiene menos de 4 caracteres', () => {
    const usuarioControl = component.registerForm.get('usuario');
    usuarioControl?.setValue('abc');
    expect(usuarioControl?.valid).toBeFalse();
    expect(usuarioControl?.errors?.['minlength']).toBeTruthy();
  });

  // TEST 4
  it('debería marcar "fechaNacimiento" como inválido si es menor de 14 años', () => {
    const fechaControl = component.registerForm.get('fechaNacimiento');
    const fechaJoven = new Date();
    fechaJoven.setFullYear(fechaJoven.getFullYear() - 10); // 10 años
    fechaControl?.setValue(fechaJoven.toISOString().split('T')[0]);
    expect(fechaControl?.errors?.['edadMinima']).toBeTrue();
  });

  // TEST 5
  it('debería marcar el formulario como inválido si las contraseñas no coinciden', () => {
    component.registerForm.get('password')?.setValue('abc123');
    component.registerForm.get('password2')?.setValue('otra123');
    // Se fuerza el update para aplicar el validador de grupo
    component.registerForm.updateValueAndValidity();
    expect(component.registerForm.errors?.['contrasenasNoCoinciden']).toBeTrue();
    expect(component.registerForm.valid).toBeFalse();
  });

  // TEST 6
  it('debería marcar el formulario como inválido si "No soy un autómata" no está marcado', () => {
    component.registerForm.get('noSoyAutomata')?.setValue(false);
    expect(component.registerForm.get('noSoyAutomata')?.valid).toBeFalse();
    expect(component.registerForm.valid).toBeFalse();
  });
});
