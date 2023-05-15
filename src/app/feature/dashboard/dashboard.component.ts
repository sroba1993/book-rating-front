import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { IBook, IBookData, IBookRating } from 'src/app/core/model/book';
import { BookService } from 'src/app/core/service/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public books: IBook[] = [];
  public openAccordions: number[] = [];

  constructor(
    private appComponent: AppComponent,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.appComponent.isLoginPage = false;
    this.doLoadBookList();
  }

  doLoadBookList(): void {
    forkJoin({
      bookList: this.bookService.getBookList(),
      ratingList: this.bookService.getBookRatingList()
    }).subscribe((data: { bookList: IBookData[], ratingList: IBookRating[] }) => {
      data.bookList.forEach(bookData => {
        data.ratingList.forEach( rating => {
          if(bookData.id === rating.bookId) {
            let book: IBook = {
              id: bookData.id,
              title: bookData.title,
              author: bookData.author,
              starts: rating.stars
            }
            this.books.push(book)
          }
        })
      });
    });
  }

  public toggleAccordion(bookId: number): void {
    const index = this.openAccordions.indexOf(bookId);
    if (index !== -1) {
      this.openAccordions.splice(index, 1);
    } else {
      this.openAccordions.push(bookId);
    }
  }

  public isAccordionOpen(bookId: number): boolean {
    return this.openAccordions.includes(bookId);
  }

}
