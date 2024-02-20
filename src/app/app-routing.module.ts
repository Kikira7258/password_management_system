import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* COMPONENTS */
import { ItemsComponent } from './views/items/items.component';
import { NotesComponent } from './views/notes/notes.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AddItemComponent } from './views/items/add-item/add-item.component';
import { AddNoteComponent } from './views/notes/add-note/add-note.component';
import { EditNoteComponent } from './views/notes/edit-note/edit-note.component';
import { ViewNoteComponent } from './views/notes/view-note/view-note.component';
import { ProfileComponent } from './views/profile/profile.component';
import { EditProfileComponent } from './views/profile/edit-profile/edit-profile.component';
import { ItemFormComponent } from './views/items/item-form/item-form.component';
import { ItemDetailComponent } from './views/items/item-detail/item-detail.component';


/* ROUTES */
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'items', component: ItemsComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'item-form', component: ItemFormComponent },
  { path: 'item-detail/:id', component: ItemDetailComponent },

  { path: 'favorites', component: FavoritesComponent },

  { path: 'notes', component: NotesComponent },
  { path: 'add-note', component: AddNoteComponent },
  { path: 'edit-note/:id', component: EditNoteComponent },
  { path: 'view-note/:id', component: ViewNoteComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
