import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  // >> Services and router <<
  constructor(private NoteService: NoteService, private router: Router) {}

  ngOnInit(): void {
  }


  // >> feilds are initially empty <<
  data: any = {
    title: '',
    note: ''
  }


  // >> returns an array of arrays
  notes: any[] = [];


  // >> Create a new note <<
  addNote() {
    this.NoteService.createNote(this.data).subscribe(() => {
      // Display sweetAlert on success item creation
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Note added successfully.'
      });
      
      // Redirect to the notes page after note creation
      setTimeout(() => {
        this.router.navigate(['/notes']);
      }, 1000);
    })
  }

}
