import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?: HttpHeaders;
  params?: HttpParams;
}
@Injectable()
export class HttpService {

  constructor(protected http: HttpClient) { }

  public doGet<T>(serviceUrl: string, opts?: Options): Observable<T> {
    return this.http.get<T>(serviceUrl, opts);
  }

  public doPost<T, R>(serviceUrl: string, body: T, opts?: Options): Observable<R> {
    return this.http.post<R>(serviceUrl, body, opts);
  }

  public doDelete<R>(serviceUrl: string, opts?: Options): Observable<R> {
    return this.http.delete<R>(serviceUrl, opts);
  }


}
