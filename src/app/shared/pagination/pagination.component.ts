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

  // Generate an array of page numbers based on total pages
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
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
  goToPage(page: number) {
    this.pageChange.emit(page);
  }

}
