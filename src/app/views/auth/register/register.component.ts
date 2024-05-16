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
    password: '',
    confirm_password: ''
  };
  
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}


     // >> Toggle password visibility <<
     isPasswordVisible: boolean = false;
     isConfirmPasswordVisible: boolean = false;

     togglePasswordVisibility() {
       this.isPasswordVisible = !this.isPasswordVisible;
     }

     toggleConfirmPasswordVisibility() {
       this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
     }
     // >>>>>>>>>>>>>>>>>>>>>>>>>>>
     

  // Function to handle for submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Register a user
      this.userService.registerProfile(this.data).subscribe((res) => {
        if (res.status !== 'success') {
          if (res.error.email) {
            form.controls['email'].setErrors({ 'unique': res.error.email });
          }
          return;
        }

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
        this.router.navigate(['/login']);
      })

    } else {
      // Log errors to console and show error message to the user
      console.log(form.errors);
      // Swal.fire('Something went wrong');
    }
  }



  restrictInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const regex = /^[a-zA-Z]*$/; // Allow only letters

    // Check each character against the expression
    for (let i = 0; i < inputValue.length; i++) {
      if (!regex.test(inputValue[i])) {
        inputElement.value = inputValue.slice(0, i) + inputValue.slice(i + 1);
        break;
      }
    }
  }


}
