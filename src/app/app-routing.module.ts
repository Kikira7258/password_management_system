import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* ROUTES */
import { AllItemsComponent } from './views/all-items/all-items.component';
import { NotesComponent } from './views/notes/notes.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegistrationComponent } from './views/auth/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'all-items', component: AllItemsComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
