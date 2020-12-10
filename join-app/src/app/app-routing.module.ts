import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormActPerfilComponent } from './pages/form-act-perfil/form-act-perfil.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:"perfil", component:ProfileComponent},
  {path:"perfilAct", component:FormActPerfilComponent},
  {path:"**",component:HomeComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
