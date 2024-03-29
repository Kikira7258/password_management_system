import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getProfile()
  }

  logout(): void {
    this.userService.logout(); // Call the logout method from the UserService

    // Redirect to the authentication page
    this.router.navigateByUrl('/login');
  }
  

}



