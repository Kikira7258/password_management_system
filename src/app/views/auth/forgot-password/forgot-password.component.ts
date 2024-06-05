import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @Input() open: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  step: 'forget' | 'verify' | 'reset' = 'forget';

  email: string = "";
  otp: string = "";

  newPassword: string = '';
  confirmPassword: string = '';
  resetPasswordError: string = '';

  attempts = 0;
  maxAttempts = 3;
  showInvalidOTPMessage: boolean = false;
  countdown: number = 60;
  countdownSubscription: Subscription | undefined;

  constructor(private userService: UserService, private router:Router) { }

  forgotPassword(form:NgForm) {
    if(form.invalid) return;

    this.userService.sendForgotPasswordEmail(this.email).subscribe((res) => {
      console.log(res);
      
      if(res.status === 'success') {
        this.step = 'verify';
      }
    })
  }




  resendCode() {
    this.userService.sendForgotPasswordEmail(this.email).subscribe(
      (response) => {
      if(response.status === 'success'){
        Swal.fire({
          title: 'OTP Resent',
          text: 'OTP code has been resent to your email.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to resend OTP. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        }); 
      }
    });
  }



  verify(){
    this.userService.verifyOTP(this.otp, this.email).subscribe({
      next:(response) => {
      if(response.status === 'success'){
        // Navigate to the reset password page
        this.step = 'reset';
      } else {
        this.handleFailedAttempt();        
      }
    },
      error:(error) => {
        console.error('Error verifying OTP:', error);
        this.handleFailedAttempt(); 
      }}
    );
  }

  

  resetPassword(form:NgForm) {

    console.log(this.newPassword, this.confirmPassword, form);
    

    if(form.invalid) return;

    // Ensure new password matches confirm password
    if (this.newPassword !== this.confirmPassword) {
      this.resetPasswordError = 'Passwords do not match';
      return; // Exit the method if passwords do not match
    }


    // Call the UserService method to reset password
    this.userService.resetPassword({
      email: this.email,
      otp: this.otp,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    }).subscribe({
      next: (res) =>  {
        if (res.status === 'success') {
        // Password successfully reset
        this.closeModal(); // Close the modal

        this.step = 'forget';
        this.email = '';
        this.otp = '';
        this.newPassword = '';
        this.confirmPassword = '';

        // Show Sweet Alter message
        Swal.fire({
          icon: 'success',
          title: 'Password reset successfully.',
          showConfirmButton: false,
          timer: 1500 // Close after 1.5 seconds
        })
       }
      },
      error: (error: any) => {
        // handle error response from API
        if (error.status === 401) {
          this.resetPasswordError = 'An error occurred. Please try again.';
        }
      }
    })

  }



  handleFailedAttempt() {
    this.showInvalidOTPMessage = true;
    this.attempts++;

    if (this.attempts >= this.maxAttempts) {
      Swal.fire({
        title: 'Maximum Attempts Reached',
        text: 'You have reached the maximum number of attempts. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        this.open = false;
        this.attempts = 0;
        this.email = '';
        this.otp = '';
      });
    } else {
      this.startCountdown();
    }
  }


  startCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.countdown = 60;
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.countdownSubscription?.unsubscribe();
      } 
    });
  }


  closeModal() {
    this.close.emit();
  }

}
