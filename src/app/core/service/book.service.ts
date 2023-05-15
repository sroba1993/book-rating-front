import { Observable } from "rxjs";
import { IBookData, IBookRating } from "../model/book";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.dev";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class BookService {

    constructor(protected httpService: HttpService) { }

    public getBookList(): Observable<IBookData[]> {
        const url = `${environment.apiUrl}${environment.bookApi}`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpService.doGet(url, { headers });
    }

    public getBookRatingList(): Observable<IBookRating[]> {
        const url = `${environment.apiUrl}${environment.ratingApi}`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpService.doGet(url, { headers });
    }
}