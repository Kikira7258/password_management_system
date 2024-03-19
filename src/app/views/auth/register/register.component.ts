// --------------------
// >> IMPORTS <<
// --------------------
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// --------------------

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Fields are initiallty empty
  data: any = {
    first_nm: '',
    last_nm: '',
    email: '',
    password: ''
  };
  
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  // Function to handle for submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Register a user
      this.userService.registerProfile(this.data).subscribe((res) => {

        // Display a toaster on success user creation
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
          title: 'User created successfully.'
        });

        // Reset the form after submission
        form.resetForm();
        this.router.navigate(['/items']);
      })

    } else {
      // Log errors to console and show error message to the user
      console.log(form.errors);
      Swal.fire('Something went wrong');
    }
  }


}
