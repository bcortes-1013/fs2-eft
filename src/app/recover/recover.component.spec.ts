import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverComponent } from './recover.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RecoverComponent', () => {
  let component: RecoverComponent;
  let fixture: ComponentFixture<RecoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(RecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Muestra error si no hay correo válido', () => {
    component.recoverForm.controls['email'].setValue('noexiste@example.com');
    component.recuperar();

    expect(component.error).toBe('Usuario no encontrado con ese correo');
    expect(component.mensaje).toBe('');
  });

  it('No enviar formulario si hay algo inválido', () => {
    spyOn(component.recoverForm, 'markAllAsTouched');
    component.recoverForm.controls['email'].setValue('');  // Campo requerido vacío

    component.recuperar();

    expect(component.recoverForm.markAllAsTouched).toHaveBeenCalled();
    expect(component.mensaje).toBe('');
    expect(component.error).toBe('');
  });
});
