import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // Initialize dropdownOpen variable
  dropdownOpen: boolean = false;

  // Initialize fileSizeError variable
  fileSizeError: boolean = false;

  // Initialize userDetail with default values
  userDetail: User = {
    _id: '',
    first_nm: '',
    last_nm: '',
    email: '',
    password: '',
    profileImage: ''
  }


  // Initialize showChangePasswordModal variable
  showChangePasswordModal: boolean = false;

  openChangePasswordModal() {
    this.showChangePasswordModal = true;
  }

  closeChangePasswordModal() {
    this.showChangePasswordModal = false;
  }
 // >> ------------------------------- <<


  // Loader
  loading: boolean = false

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private elRef: ElementRef) { }

  ngOnInit(): void {
      this.getUserProfile(); // Call getUserProfile on component initialization
  }

  
  getUserProfile(): void {
    this.loading = true; // Set loader to true before making the API call
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.userDetail = response.data.user;
        this.loading = false; // Set loader to false if the API call is successful
      },
      
      error: (error) => {
        console.log('Error retrieving user profile:', error);
        this.loading = false; // Set loader to false if there's an error
      }
    });
  }


  updateProfile() {
    // Check if there is a file size error
    if (this.fileSizeError) {
      return; // Exit the method without proceeding if there is a file size error
    }

    // Call the updateUser method of the userService
    this.userService.updateProfile(this.userDetail._id!, this.userDetail).subscribe({
      next: updateProfile => {

        // update the userDetail with the data from the server response
        this.userDetail = updateProfile.data.user;

        // Log success message to the console
        console.log('User updated successfully:', updateProfile);

        // Show SweetAlert for success
        this.showSuccessToast();

      },
      error: (error) => {
        console.log('Error updating profile:', error);

        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'An error occurred while updating your profile. Please try again later.'
        });
      }
    });
  }


// >> Function to handle dropdown <<
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // >> add a listener for close dropdown on click outside <<
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.querySelector('.gear-container').contains(event.target)) {
      this.dropdownOpen = false; // Close dropdown if clicked outside
    }
  }
// >> Function to handle dropdown ends here <<


 // >> Function to confirm delete account <<
 confirmDelete() {
  Swal.fire({
    title: 'Are you sure you want to delete your account?',
    text: "You will not be able to recover you account!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // Call the delete account API enpoint
      this.userService.deleteProfile(this.userDetail._id!).subscribe({
        next: () => {
          // on successful deletion, navigate to the login page or perform any other action
          this.router.navigate(['/login']);
          // Show success message
          Swal.fire(
            'Deleted!',
            'Your account has been deleted.',
            'success'
          );
        },
        error: (error) => {
          console.log('Error deleting account:', error);
          // Show error message
          Swal.fire(
            'Error!',
            'An error occurred while deleting your account. Please try again later.',
            'error'
          );
        }
      });
    }
  });
 }



 // Show success toast
 showSuccessToast() {
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
    title: 'User updated successfully.'
   });
 }


 // Handles image preview when a file is selected
 onFileSelected(event: any) {
  const file: File = event.target.files[0];

  // Check if a file is selected
  if (file) {

    // Check file size (in bytes)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    if (file.size > maxSizeInBytes) {
      // Set fileSizeError to true to display the error message
      this.fileSizeError = true;
      return;
    }

    // Reset fileSizeError if the size is within the limit
    this.fileSizeError = false;

    // Create a FilereadReader object to read the file
    const reader = new FileReader();

    // Read the file as data URL, which allows displaying the image preview
    reader.readAsDataURL(file);

    // Define a callback function to be executed when reading is completed
    reader.onload = (e: any) => {
      // Update the image src eith the data URL
      this.userDetail.profileImage = e.target.result;
    }
  }
 }

 

}
