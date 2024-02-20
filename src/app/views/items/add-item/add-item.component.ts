import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

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
      this.router.navigate(['/items']);
      // window.alert('Item Created')
    })
  }



  // >> Toggle password visibility <<
  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

}
