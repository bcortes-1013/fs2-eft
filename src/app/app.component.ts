import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  // constructor(private authService: AuthService) {
  //   // Al inyectar el servicio, se ejecuta el constructor automáticamente
  // }
}
