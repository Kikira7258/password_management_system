import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage = 1; // Current page number
  @Input() totalPages = 1; // Total number of pages
  @Output() pageChange = new EventEmitter<number>(); // Event emitter for page change

  // Define the page limit displaying '...'
  pageLimit = 3;

  // Generate an array of page numbers based on total pages
  // get pages(): number[] {
  //   return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  // }

  get pages(): (number | '...')[] {
    const pagesArray: (number | '...')[] = [];
    const startPage = Math.max(1, this.currentPage - Math.floor(this.pageLimit / 2));
    const endPage = Math.min(this.totalPages, startPage + this.pageLimit -1);

    if (startPage > 1) {
      pagesArray.push(1);
      if (startPage > 2) {
        pagesArray.push('...'); // Represent '...' if there are more than 2 pages
      }
    }


    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }


    if (endPage < this.totalPages) {
      if (endPage < this.totalPages -1) {
        pagesArray.push('...')
      }
      pagesArray.push(this.totalPages); 
    }
    
    return pagesArray;
  }

  // Go to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  // Go to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  // Go to a specific page
  goToPage(page: number | '...') {
    if (typeof page === 'number') {
      this.pageChange.emit(page);
    }
  }

}
