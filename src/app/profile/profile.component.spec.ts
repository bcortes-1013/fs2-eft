import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    const sesionMock = { usuario: 'Helldiver' };
    const usuariosMock = [{
      nombre: 'Helldiver',
      email: '1@helldiver.com',
      password: 'Hell123',
      tipo: 'superusuario'
    }];
    localStorage.setItem('sesion', JSON.stringify(sesionMock));
    localStorage.setItem('superusuarios', JSON.stringify(usuariosMock));

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
