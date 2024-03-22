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

  // Initialize userDetail with default values
  userDetail: User = {
    _id: '',
    first_nm: '',
    last_nm: '',
    email: '',
    password: ''
  }

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
    // Call the updateUser method of the userService
    this.userService.updateProfile(this.userDetail._id!, this.userDetail).subscribe({
      next: updateProfile => {

        // update the userDetail with the data from the server response
        this.userDetail = updateProfile.data.user;

        // Log success message to the console
        console.log('User updated successfully:', updateProfile);

        // Show SweetAlert for success
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'User updated successfully.'
        });

      }
    })
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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


}
