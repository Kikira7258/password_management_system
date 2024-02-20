import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NotesComponent } from './views/notes/notes.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { LoginComponent } from './views/auth/login/login.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ItemsComponent } from './views/items/items.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AddItemComponent } from './views/items/add-item/add-item.component';
import { AddNoteComponent } from './views/notes/add-note/add-note.component';
import { ViewNoteComponent } from './views/notes/view-note/view-note.component';
import { EditNoteComponent } from './views/notes/edit-note/edit-note.component';
import { ProfileComponent } from './views/profile/profile.component';
import { EditProfileComponent } from './views/profile/edit-profile/edit-profile.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { ItemDetailComponent } from './views/items/item-detail/item-detail.component';

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
    AddNoteComponent,
    ViewNoteComponent,
    EditNoteComponent,
    ProfileComponent,
    EditProfileComponent,
    PaginationComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
