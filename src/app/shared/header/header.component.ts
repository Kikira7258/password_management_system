import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userProfile?: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserProfile(); // Call getUserProfile on component initialization
  }

  getUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.userProfile = response.data.user;
        console.log(response.data);
      },
      error: (error) => {
        console.log('Error retrieving user profile:', error);
      }
    });
  }

}
