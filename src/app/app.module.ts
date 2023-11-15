import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { NotesComponent } from './notes/notes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AllItemsComponent,
    NotesComponent,
    FavoritesComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
