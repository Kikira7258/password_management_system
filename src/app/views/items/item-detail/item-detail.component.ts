import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ItemService } from 'src/app/services/item.service';
import { Items } from 'src/app/models/items';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

    // Initialize or provide a default value
    itemId: string = '';

    // Initialize or provide a default value
    itemDetail: Items = {
      _id: '',
      username: '',
      password: '',
      website: '',
      note: '',
      favorite: false,
      timeStamp: '',
      createdAt: new Date,
      updatedAt: new Date
    };

    constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) { }

    // Toggle Favorite function
    toggleFavorite(item: Items) {
      item.favorite = !item.favorite;
      this.updateFavorite(item)
    }


    // Update Item
    updateItem(item: Items) {
      // Call the updateItem method of the ItemService
      this.itemService.updateItem(item._id, item).subscribe({
        next: updateItem => {

          // update the itemDetail with the data from the server response
          this.itemDetail = updateItem.data;

          // Log success message to the console
          console.log('Item updated successfully:', updateItem);

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
            title: 'Item updated successfully.'            
          });

          // Redirect to the items page after item creation
          setTimeout(() => {
            this.router.navigate(['/items']);
          }, 1000);
        },
     
        error: error => {
          // Log error message to the console
          console.error('Error updating item:', error);

          // Show SweetAlert for error
            Swal.fire({
              icon: 'error',
              title: 'Error updating item',
              text: 'An error occurred while updating the item'
            });
        }
      });
    }


  // >> Update favorite <<
      updateFavorite(item: Items) {
        const updatedFavorite = { favorite: item.favorite};

        this.itemService.updateItem(item._id, updatedFavorite).subscribe({
          next: updateItem => {

            this.itemDetail.favorite = updateItem.data.favorite;
            
          },
          error: error => {
            console.error('Error update item:', error);
            item.favorite = !item.favorite;
          }
        });
      }
  //>>>>>>>>>>>>>>>>>>>>



  // >> Toggle password visibility <<
    isPasswordVisible: boolean = false;

    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

    
    ngOnInit(): void {
        // Retrieve the item ID from the route parameters
        this.route.params.subscribe(params => {
          this.itemId = params['id'];
          this.loadItemDetails();
        });
    }


    loadItemDetails(): void {
      // Call getItemById to fetch item details
      this.itemService.getItemById(this.itemId).subscribe(response => {
        this.itemDetail = response.data;
      })
    }
}
