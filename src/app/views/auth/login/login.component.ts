import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 data = {
  email: '',
  password: ''
 }

 constructor(private userService: UserService, private router: Router) { }

 ngOnInit(): void {}

 onSubmit() {
  this.userService.login(this.data).subscribe((res) => {
    if (res.status === 'success') {
      this.router.navigateByUrl('/items')
    } else {
      // Handle login failure, e.g, show an error message
      console.log('Login failed:', res.message);
    }
  })
 }
}
