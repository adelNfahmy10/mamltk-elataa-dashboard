import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { PageTitleComponent } from '@component/page-title.component';
import { BookService } from '@core/services/book/book.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sumou-book',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbPaginationModule,
    CommonModule,
  ],
  templateUrl: './sumou-book.component.html',
  styleUrl: './sumou-book.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SumouBookComponent {
  private readonly _BookService = inject(BookService)

  allBooks:any[] = []

  ngOnInit(): void {
    this.GetAllConfigurations()
  }

  GetAllConfigurations():void{
    this._BookService.GetAllContactUs().subscribe({
      next:(res)=>{
        this.allBooks = res.data
        this.totalItems = this.allBooks.length
      }
    })
  }

  currentPage = 1;
  pageSize = 10;
  totalItems!:number
  get pagedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.allBooks.slice(start, end);
  }
}
