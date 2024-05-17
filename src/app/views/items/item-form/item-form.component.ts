import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ItemService } from 'src/app/services/item.service';
import { Items } from 'src/app/models/items';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  // Initialize or provide a default value
  itemId: string = '';

  // Initialize or provide a default value
  itemDetail: Items = {
    _id: '',
    name: '',
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
    try {
      // Call the updateItem method of the ItemService
      this.itemService.updateItem(item._id, item).subscribe({
        next: updateItem => {
  
          // update the itemDetail with the data from the server response
          //this.itemDetail = updateItem.data;
  
          // Log success message to the console
          console.log('Item updated successfully:', this.itemDetail);
  
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
    } catch (error) {
      // Log error message to the console
      console.log('Error updating item:', error);

      // Show SweetAlert for error
      Swal.fire({
        icon: 'error',
        title: 'Error updating item',
        text: 'An error occurred while updating the item'
      });
    }
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
      this.itemDetail = {
        ...response.data,
        note: response.data.note && typeof response.data.note === 'object' ? response.data.note.note : '',
      };
    })
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