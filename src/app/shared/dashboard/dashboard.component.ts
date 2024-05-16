import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { NoteService } from 'src/app/services/note.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalItemCount: number = 0;
  totalNoteCount: number = 0;
  totalFavoriteCount: number = 0;
  
  constructor(private userService: UserService, private router: Router, private itemService: ItemService, private noteService: NoteService) {}


  ngOnInit(): void {
    this.userService.getProfile()

    // Fetch the total count of items when the component initializes     
    this.getTotalItemCount();

    // Fetch the total count of items when the component initializes
    this.getTotalNoteCount();

    // Fetch the total count of favorite items when the component initializes
    this.getTotalFavoriteCount();
  }

  // Fetch the total count of items from the backend
  getTotalItemCount(): void {
    this.itemService.getAllItems().subscribe(response => {
      this.totalItemCount = response.data.length;
    })
  }


  // Fetch the total count of favorite items from the backend
  getTotalFavoriteCount(): void {
    this.itemService.getAllItems(true).subscribe(response => {
      this.totalFavoriteCount = response.data.length;
    })
  }

  
   // Fetch the total count of notes from the backend
  getTotalNoteCount(): void {
    this.noteService.getAllNotes().subscribe(response => {
      this.totalNoteCount = response.data.length;
    })
  }


  logout(): void {
    this.userService.logout(); // Call the logout method from the UserService

    // Redirect to the authentication page
    this.router.navigateByUrl('/login');
  }
  

}



