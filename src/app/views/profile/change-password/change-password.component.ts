import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  changePasswordError: string = '';

  constructor(private userService: UserService) {}

  changePassword() {
    // Ensure new password matches confirm password
    if (this.newPassword !== this.confirmPassword) {
      this.changePasswordError = 'Passwords do not match';
      return; // Exit the method if passwords do not match
    }

    // Call the UserService method to change password
    this.userService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        // Password successfully changed
        this.closeModal(); // Close the modal

        // Optionally, show a sweet alert message (implement later)
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
    this.close.emit();
  }

}
