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
import { AddNoteComponent } from './views/notes/add-note/add-note.component';
import { EditItemComponent } from './views/items/edit-item/edit-item.component';
import { ViewItemComponent } from './views/items/view-item/view-item.component';
import { ViewNoteComponent } from './views/notes/view-note/view-note.component';
import { EditNoteComponent } from './views/notes/edit-note/edit-note.component';
import { ProfileComponent } from './views/profile/profile.component';
import { EditProfileComponent } from './views/profile/edit-profile/edit-profile.component';

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
    EditItemComponent,
    ViewItemComponent,
    AddNoteComponent,
    ViewNoteComponent,
    EditNoteComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
