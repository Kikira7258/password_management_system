import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { NoteService } from 'src/app/services/note.service';
import { Notes } from 'src/app/models/notes';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  // Initialize or provide a default value
  noteId: string = '';

  // Initialize or provide a default value
  noteDetail: Notes = {
    _id: '',
    title: '',
    note: '',
    timeStamp: ''
  }

  constructor(private route: ActivatedRoute, private router: Router, private noteService: NoteService) {}
  

  // Update Note
  updateNote(note: Notes){
    // call the updateNote method of the NoteService
    this.noteService.updateNote(note._id, note).subscribe({
      next: updateNote => {

        // update the noteDetail with the data from the server response
        this.noteDetail = updateNote.data;

        // Log success message to the console
        console.log('Note updated successfully:', updateNote);

        // Show SweetAlert for success
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'Note updated successfully.'
        });

        // Redirect to the notes page after item creation
        setTimeout(() => {
          this.router.navigate(['/notes']);
        }, 1000);
      },

      error: error => {
        // Log error message to the console
        console.error('Error updating note:', error);

        // Show SweetAlert for error
        Swal.fire({
          icon: 'error',
          title: 'Error updating note',
          text: 'An error occured while updating note'
        });
      }
    });
  }


  ngOnInit(): void {
    // Retrieve the note ID from the route parameters
    this.route.params.subscribe(params => {
      this.noteId = params['id'];
      this.loadNoteDetails();
    })   
  }

  loadNoteDetails(): void {
    // Call getNoteById to fetch note details
    this.noteService.getNotById(this.noteId).subscribe(response => {
      this.noteDetail = response.data;
    })
  }
}
