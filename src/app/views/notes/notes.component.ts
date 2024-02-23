import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Notes } from 'src/app/models/notes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

// >> Declarations <<

    // Notes array
    notes: Notes[] = [];

    // Search filter
    searchQuery: string = '';
    filteredNotes: Notes[] = [];

    // Pagination
    totalNotes: number = 0;
    currentPage = 1; // Current Page
    notesPerPage = 5; // Number of items per page
    
// >>>>>>>>>>>>>>>>>>>>

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
      this.getAllNotes();
  }


// >> Get All Notes <<
  getAllNotes() {

    // Limit notes per page || Pagination
    const startIndex = (this.currentPage - 1) * this.notesPerPage;
    const endIndex = startIndex + this.notesPerPage;

    this.noteService.getAllNotes().subscribe(results => {
      this.notes = results.data.slice(startIndex, endIndex);
      this.totalNotes = results.data.length;

      // Search Filter
      this.filteredNotes = this.notes;
    })
  }
// >>>>>>>>>>>>>>>>>>>>



// >> Delete Note <<
  deleteNote(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      // confirmButtonColor:
      // cancelButtonColor:
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteService.deleteNote(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          );

          setTimeout(() => {
            this.router.navigate(['/notes']);
          }, 1000);

          this.getAllNotes()
        })
      }
    }) 
  }
// >>>>>>>>>>>>>>>>>>>>



// >> Pagination <<
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.getAllNotes(); // Fetch items for the new page
  }

  calculateTotalPages(): number {
    return Math.ceil(this.totalNotes / this.notesPerPage);
  }
//>>>>>>>>>>>>>>>>>>>>


// >> Search Filter <<
applySearchFilter() {
  if(this.searchQuery) {
    // Check if the searchQuery is not empty
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      note.note.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
  } else {
    //Reset to original list if search query is empty
    this.filteredNotes = this.notes;
  }
}
//>>>>>>>>>>>>>>>>>>>>

}
