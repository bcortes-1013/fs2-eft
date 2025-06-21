import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  sesion: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.sesion$.subscribe(sesion => {
      this.sesion = sesion;
    });
  }
  
  cerrarSesion() {
    console.log("Cerrando sesión");
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }
}
