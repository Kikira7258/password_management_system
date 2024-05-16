import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  password: '',
  rememberMe: null
 };

 loginError = false; // Flag to track if there's a login error


// >> Initialize showForgotPasswordModal variable <<
showForgotPasswordModal: boolean = false;

openForgotPasswordModal() {
  this.showForgotPasswordModal = true;
}

closeForgotPasswordModal() {
  this.showForgotPasswordModal = false;
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>


 constructor(private userService: UserService, private router: Router) { }

 ngOnInit(): void {}



   // >> Toggle password visibility <<
   isPasswordVisible: boolean = false;

   togglePasswordVisibility() {
     this.isPasswordVisible = !this.isPasswordVisible;
   }
   // >>>>>>>>>>>>>>>>>>>>>>>>>>>
   

 onSubmit(form: NgForm) {
  this.userService.login(this.data).subscribe((res) => {
    if (res.status === 'success') {
      this.router.navigateByUrl('/items')
    } else {
      // Handle login failure, e.g, show an error message
      console.log('Login failed:', res.message);
      this.loginError = true; // Set loginError to true to display error message
    }
  });
 }
 
}
