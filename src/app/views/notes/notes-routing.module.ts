import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './notes.component';
import { AddNoteComponent } from './add-note/add-note.component';

const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: 'add-note', component: AddNoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
