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
    // Check if any input has a value
    const hasValue = Object.values(this.data).some(value => !!value);

    if (!hasValue) {
      // If none of the fields have a value, display SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in at least one field.'
      })

      return
    }

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


  // Check if username is valid
  isUsernameValid(): boolean {
    const username = this.data.username.trim();

    const regex = /^[a-zA-Z0-9_\-.@]+$/; // Regular expression pattern

    return regex.test(username) && username.length >= 3 && username.length <= 50;
  }

 // Check if website is valid
 isWebsiteValid(): boolean {
    return this.data.website.trim() !== '';
  }



  // >> Toggle password visibility <<
  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>



  onUsernameKeydown(event: KeyboardEvent) {
    const allowedChars = /^[a-zA-Z0-9_\-.@]*$/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }

}
