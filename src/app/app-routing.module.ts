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
import { ProfileComponent } from './views/profile/profile.component';
import { ItemFormComponent } from './views/items/item-form/item-form.component';
import { NoteFormComponent } from './views/notes/note-form/note-form.component';
import { requiresUnauthGuard } from './guards/requires-unauth.guard';
import { requiresAuthGuard } from './guards/requires-auth.guard';


/* ROUTES */
const routes: Routes = [
  // Requires Authentication
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: ItemsComponent, canActivate: [requiresAuthGuard] },
  { path: 'add-item', component: AddItemComponent, canActivate: [requiresAuthGuard] },
  { path: 'item-form/:id', component: ItemFormComponent, canActivate: [requiresAuthGuard] },

  { path: 'favorites', component: FavoritesComponent, canActivate: [requiresAuthGuard] },

  { path: 'notes', component: NotesComponent, canActivate: [requiresAuthGuard] },
  { path: 'add-note', component: AddNoteComponent, canActivate: [requiresAuthGuard] },
  { path: 'note-form/:id', component: NoteFormComponent, canActivate: [requiresAuthGuard] },

  { path: 'profile', component: ProfileComponent, canActivate: [requiresAuthGuard] },
  

  // Requires Unauthentication
  { path: 'login', component: LoginComponent, canActivate: [requiresUnauthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [requiresUnauthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
