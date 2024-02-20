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
    userName: '',
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
        timer: 2000,
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
      }, 2000);
    });
  }



  // >> Toggle password visibility <<
  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

}
