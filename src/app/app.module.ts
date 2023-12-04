import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NotesComponent } from './views/notes/notes.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { LoginComponent } from './views/auth/login/login.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ItemsComponent } from './views/items/items.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AddItemComponent } from './views/items/add-item/add-item.component';
import { EditItemComponent } from './views/items/edit-item/edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    FavoritesComponent,
    LoginComponent,
    DashboardComponent,
    ItemsComponent,
    RegisterComponent,
    AddItemComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
