import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NotesComponent } from './views/notes/notes.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { LoginComponent } from './views/auth/login/login.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ItemsComponent } from './views/items/items.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AddItemComponent } from './views/items/add-item/add-item.component';
import { AddNoteComponent } from './views/notes/add-note/add-note.component';
import { ProfileComponent } from './views/profile/profile.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { NoteFormComponent } from './views/notes/note-form/note-form.component';
import { HeaderComponent } from './shared/header/header.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ItemFormComponent } from './views/items/item-form/item-form.component';
import { ChangePasswordComponent } from './views/profile/change-password/change-password.component';
import { VerifyPasswordComponent } from './views/auth/verify-password/verify-password.component';
import { ResetPasswordComponent } from './views/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './views/auth/forgot-password/forgot-password.component';
import { PasswordVisibilityComponent } from './shared/password-visibility/password-visibility.component';

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
    ProfileComponent,
    PaginationComponent,
    NoteFormComponent,
    HeaderComponent,
    ItemFormComponent,
    ChangePasswordComponent,
    VerifyPasswordComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    PasswordVisibilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
