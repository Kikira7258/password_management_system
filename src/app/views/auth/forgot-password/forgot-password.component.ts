import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @Input() open: boolean = false; // Input to control modal visibility
  @Output() close: EventEmitter<void> = new EventEmitter<void>(); // Output to notify parent to close the modal

  step: 'forget' | 'verify' | 'reset' = 'forget'; // Current step in the process

  email: string = ""; // Email address entered by the user
  otp: string = ""; // OTP entered by the user

  newPassword: string = ''; // New password entered by the user
  confirmPassword: string = ''; // Confirm password entered by the user
  resetPasswordError: string = ''; // Error message for password reset

  //attempts = 0; // Number of OTP verification attempts
  //maxAttempts = 3; // Maximum allowed OTP verification attempts
  showInvalidOTPMessage: boolean = false; // Flag to show/hide invalid OTP message
  countdown: number = 60; // Countdown timer for OTP resend
  countdownSubscription: Subscription | undefined; // Subscription for countdown timer
  isContinueDisabled: boolean = false; // Flag to disable/enable continue button

  @ViewChild('emailForm') emailForm!: NgForm; // Reference to the email form
  @ViewChild('otpForm') otpForm!: NgForm; // Reference to the OTP form
  @ViewChild('passwordForm') passwordForm!: NgForm; // Reference to the password form

  constructor(private userService: UserService, private router:Router) { }

  // Validate numeric input for OTP field
  validateNumericInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }


  // Handle forgot password form submission
  forgotPassword(form:NgForm) {
    if(form.invalid) return;

    this.userService.sendForgotPasswordEmail(this.email).subscribe((res) => {
      console.log(res);
      
      if (res.status === 'success') {
        this.startCountdown();
        this.step = 'verify';
      }
    });
  }



  // Resend OTP code
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

        this.startCountdown(); // Restart the countdown when OTP is resent
        this.isContinueDisabled = false; // Enable the continue button when the OTP is resent

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


// Handle OTP verification form submission
  verify(otpForm: NgForm) {
    if(otpForm.invalid) {
      return;
    }

    this.userService.verifyOTP(this.otp, this.email).subscribe({
      next:(response) => {
      if(response.status === 'success'){
        // Navigate to the reset password page
        this.step = 'reset';
      } else {
        //this.handleFailedAttempt();  

        if (response.statusCode === 429) {
          Swal.fire({
          title: 'Maximum Attempts Reached',
          text: 'You have reached the maximum number of attempts. Please try again in 10 minutes.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          // this.open = false;
          // this.attempts = 0;
          // this.email = '';
          this.otp = '';
        }); 
        }
             
      }
    },
      error:(error) => {
        console.error('Error verifying OTP:', error);
        //this.handleFailedAttempt(); 
      }
    });
  }

  

  resetPassword(form:NgForm) {

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


  // Handle OTP verification failed attempts
  // handleFailedAttempt() {
  //   this.showInvalidOTPMessage = true;
  //   this.attempts++;

  //   if (this.attempts >= this.maxAttempts) {
  //     Swal.fire({
  //       title: 'Maximum Attempts Reached',
  //       text: 'You have reached the maximum number of attempts. Please try again later.',
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     }).then(() => {
  //       // this.open = false;
  //       this.attempts = 0;
  //       // this.email = '';
  //       this.otp = '';
  //     });
  //   } else {
  //     this.startCountdown();
  //   }
  // }


  startCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.countdown = 60;
    this.isContinueDisabled = false; // Ensure the continue button is enabled at the start
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.isContinueDisabled = true; // Disable the continue button when countdown reaches 0
        this.countdownSubscription?.unsubscribe();
      } 
    });
  }


  // Close the modal and reset all form states
  closeModal() {
    this.open = false;
    this.step = 'forget';
    
    this.email = '';
    this.otp = '';
    this.newPassword = '';
    this.confirmPassword = '';

    this.resetPasswordError = '';
    this.showInvalidOTPMessage = false;

    this.countdownSubscription?.unsubscribe();
    this.countdown = 60;
    this.isContinueDisabled = false; // Ensure the continue button is enabled when the modal is closed

    // Reset the forms
    if(this.emailForm)this.emailForm.reset();
    if(this.otpForm)this.otpForm.reset();
    if(this.passwordForm)this.passwordForm.reset();

    this.close.emit();
  }

}
