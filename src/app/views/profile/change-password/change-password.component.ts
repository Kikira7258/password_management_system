import { NgForm } from '@angular/forms';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  @Input() open: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  changePasswordError: string = '';

  @ViewChild('passwordForm') form?: NgForm;

  constructor(private userService: UserService) {}


     // >> Toggle password visibility <<
     isPasswordVisible: boolean = false;

     togglePasswordVisibility() {
       this.isPasswordVisible = !this.isPasswordVisible;
     }
     // >>>>>>>>>>>>>>>>>>>>>>>>>>>


  changePassword(form: NgForm) {
    // Ensure new password matches confirm password
    if (this.newPassword !== this.confirmPassword) {
      this.changePasswordError = 'Passwords do not match';
      return; // Exit the method if passwords do not match
    }

    // Ensure new password is not the same as the current password
    if (this.newPassword === this.currentPassword) {
      this.changePasswordError = 'New password cannot be the same as the current password';
      return; // Exit the method if passwords do not match
    }


    // Call the UserService method to change password
    this.userService.changePassword({
      currentPassword: this.currentPassword, 
      newPassword: this.newPassword, 
      confirmPassword: this.confirmPassword}).subscribe({
      next: (res) => {
        console.log(res);
        
        // Password successfully changed
        this.closeModal(); // Close the modal


        // Show Sweet Alter message
        Swal.fire({
          icon: 'success',
          title: 'Password Updated successfully.',
          showConfirmButton: false,
          timer: 1500 // Close after 1.5 seconds
        }).then(() => {
          // Logout user
          this.userService.logout();
        })
        
        // Clear the form fields and error message
        this.clearForm(); 
      },
      error: (error: any) => {
        // handle error response from API
        if (error.status === 401) {
          this.changePasswordError = 'Incorrect current password';
        } else {
          this.changePasswordError = 'An error occurred. Please try again.';
        }
      }
    })
  }

  closeModal() {
    this.clearForm(); // Clear the form fields and error message
    this.close.emit();
  }

  clearForm() {
    this.form?.reset()
  }

}
