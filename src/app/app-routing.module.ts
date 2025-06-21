import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { RecoverComponent } from './recover/recover.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'registro', component: RegisterComponent  },
  { path: 'login', component: LoginComponent  },
  { path: 'categoria/:nombre', component: CategoryComponent },
  { path: 'perfil', component: ProfileComponent  },
  { path: 'carrito', component: CartComponent  },
  { path: 'recuperar', component: RecoverComponent  },
  { path: 'admin', component: AdminComponent  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
