import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormActPerfilComponent } from './pages/form-act-perfil/form-act-perfil.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PublicProfileComponent } from './pages/public-profile/public-profile.component';
import { ScoreComponent } from './pages/score/score.component';
import { ModifyComponent } from './pages/modify/modify.component';

const routes: Routes = [
  {path:"perfil", component:ProfileComponent},
  {path:"perfilAct", component:FormActPerfilComponent},
  {path:"score",component:ScoreComponent},
  {path:"perfil/public",component:PublicProfileComponent},
  {path:"perfil/modify",component:ModifyComponent},
  {path:"perfil/score",component:ScoreComponent},
  {path:"**",component:HomeComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
