import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  // >> Services and router <<
  constructor(private ItemService: ItemService, private router: Router) {}

  ngOnInit(): void {
  }


  // >> feilds are initially empty <<
  data: any = {
    name: '',
    username: '',
    password: '',
    website: '',
    note: '',
    favorite: false
  };


  // >> returns an array of arrays
  items: any[] = [];


  // >> Create a new item <<
  addItem() {
    // Check if any input other than the name has a value
    const hasValue = Object.keys(this.data).filter(key => key !== 'name').some(key => {
      const value = this.data[key];
      return typeof value === 'string' && !!value.trim(); // Check if the value is a string and empty after trimming
    });
    // const hasValue = Object.values(this.data).some(value => !!value);

    if (!hasValue) {
     // If none of the fields have a value other than the name, submit the form
     try {
       this.ItemService.createItem(this.data).subscribe(() => {
         //Display SweetAlert on Success item creation
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
         console.log('Item added successfully:', this.data);
         Toast.fire({
           icon: 'success',
           title: 'Item added successfully.'
           
         });
   
         // Redirect to the items page after item creation
         setTimeout(() => {
           this.router.navigate(['/items']);
         }, 1000);
       });
     } catch (error) {
       Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Something went wrong!'
       })
       console.log('Item failed:', error);
     }
    } 
  }



 // Check if website is valid
 isWebsiteValid(website: string): boolean {

    // Trim leading and trailing spaces from the website string
    website = website.trim();

    // Define a regex pattern that allows the characters permitted in a URL
    const regex = /^[a-zA-Z0-9_.\-/:?=&#%]+$/;

    // Check if the website string matches the regex pattern
    const isValidFormat = regex.test(website);

    // If the website string does not match the regex pattern, it's invalid
    if(!isValidFormat) {
      return false; // Return false indicating invalid URL format
    }

    // If the website is empty, it's considered valid
    if (website.trim() === '') {
      return true; // Reeturn true for empty string
    }

    // Check if the website string ends with a valid domain extension (e.g., .com, .net, .co, org)
    const validDomainExtensions = ['com', 'net', 'co', 'org', 'edu', 'gov', 'io', 'info', 'biz', 'tv', 'me', 'us', 'uk', 'ca']; // Add more extensions if needed

    // Extract the last part of the website string after the last dot (.)
    const domainExtension = website.split('.').pop()?.toLocaleLowerCase();

    // Check if the extracted domain extension is in the list of valid extensions
    if (domainExtension && validDomainExtensions.includes(domainExtension)) {
      return true; // Return true if the domain extension is valid
    }

    // If the website is not a valid URL, return false
    return false;
  }



  // >> Toggle password visibility <<
  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>


  // Regex for username validation
  onUsernameKeydown(event: KeyboardEvent) {
    const allowedChars = /^[a-zA-Z0-9_\-.@]*$/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }

  // Regex for name validation
  onNameKeydown(event: KeyboardEvent) {
    const allowedChars = /^[a-zA-Z0-9\s]*$/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }

}
