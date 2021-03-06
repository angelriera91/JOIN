import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { EventsComponent } from './pages/events/events.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './pages/categories/categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { FormActPerfilComponent } from './pages/form-act-perfil/form-act-perfil.component';
import { ScoreComponent } from './pages/score/score.component';
import { PublicProfileComponent } from './pages/public-profile/public-profile.component';
import { ModifyComponent } from './pages/modify/modify.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './pages/aboutUs/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,  
    EventsComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    FormActPerfilComponent,
    ScoreComponent,
    PublicProfileComponent,
    ModifyComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
