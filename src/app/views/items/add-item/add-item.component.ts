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

      Toast.fire({
        icon: 'success',
        title: 'Item added successfully.'
        
      });

      // Redirect to the items page after item creation
      setTimeout(() => {
        this.router.navigate(['/items']);
      }, 1000);
    });
  }


  // Check if the form is valid
  isFormValid() {
    return this.isUsernameValid() && this.isPasswordValid() && this.isWebsiteValid() && this.isNoteValid();
  }

  // Check if username is valid
  isUsernameValid(): boolean {
    return this.data.username.trim().length >= 3 && this.data.username.trim().length <= 50;
  }

 // Check if website is valid
 isWebsiteValid(): boolean {
    return this.data.website.trim() !== '';
  }

  // Check if password is valid
  isPasswordValid(): boolean {
    return this.data.password.trim().length >= 6 && this.data.password.trim().length <= 50;
  }

  // Check if note is valid
  isNoteValid() : boolean {
    return this.data.note.trim().length <= 1000; // Note should not exceed 1000 characters
  }


  // >> Toggle password visibility <<
  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

}
