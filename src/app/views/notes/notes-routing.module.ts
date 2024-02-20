import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './notes.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { ViewNoteComponent } from './view-note/view-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';

const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: 'add-note', component: AddNoteComponent },
  { path: 'view-note/:id', component: ViewNoteComponent },
  { path: 'edit-note/:id', component: EditNoteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
