import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Items } from '../../models/items';

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
    console.log(item)
    item.favorite = !item.favorite;
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


  // Delete All Items
  deleteItem(id: string) {
    this.itemService.deleteItem(id).subscribe(results => {
      this.getAllItems()
    })
  }


// Pagination
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.getAllItems(); // Fetch items for the new page
  }

  calculateTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
//>>>>>>>>>>>>>>>>>>>>



// Search Filter
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
