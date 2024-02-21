import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Items } from '../../models/items';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

// >> Declarations <<

  // Items array
  items: Items[] = [];
  
  // Search Filter
  searchQuery: string = '';
  filteredItems: Items[] = [];

  // Pagination
  totalItems: number = 0;
  currentPage = 1; // Current Page
  itemsPerPage = 6; // Number of items per page

// >>>>>>>>>>>>>>>>>>>>

  constructor(private itemService: ItemService){}

  // Toggle Favorite function
  toggleFavorite(item: Items) {
    item.favorite = !item.favorite;
    this.updateFavorite(item)
  }


  ngOnInit(): void {
      this.getAllItems();
  }


// Get All Items
  getAllItems() {

    // Limit items per page || Pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(startIndex, endIndex)

    this.itemService.getAllItems().subscribe(results => {
      this.items = results.data.slice(startIndex, endIndex);
      this.totalItems = results.data.length;

      // Search Filter
      this.filteredItems = this.items;
    })
  }
//>>>>>>>>>>>>>>>>>>>>



// Delete All Items
  deleteItem(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      // confirmButtonColor:
      // cancelButtonColor:
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemService.deleteItem(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          );
          this.getAllItems()
        })
      }
    }) 
  }
//>>>>>>>>>>>>>>>>>>>>



// >> Update favorite <<
updateFavorite(item: Items) {
  const updatedFavorite = { favorite: item.favorite};

  this.itemService.updateItem(item._id, updatedFavorite).subscribe({
    next: updateItem => {
      console.log('Item updated successfully:', updateItem)

      const index = this.items.findIndex(i => i._id === updateItem.data._id);
      if (index !== -1) {
        this.items[index].favorite = updateItem.data.favorite;
      }
    },
    error: error => {
      console.error('Error update item:', error);
      item.favorite = !item.favorite;
    }
  });
}
//>>>>>>>>>>>>>>>>>>>>



// >> Pagination <<
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.getAllItems(); // Fetch items for the new page
  }

  calculateTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
//>>>>>>>>>>>>>>>>>>>>



// >> Search Filter <<
  applySearchFilter() {
    if(this.searchQuery) {
      // Check if the searchQuery is not empty
      this.filteredItems = this.items.filter(item =>
        item.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.website.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    } else {
      //Reset to original list if search query is empty
      this.filteredItems = this.items;
    }
  }
//>>>>>>>>>>>>>>>>>>>>

}
