import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.dev";
import { IToken } from "../model/token";

@Injectable()
export class AuthenticationService {

    constructor(protected httpService: HttpService) { }

    public getToken(user: any, password:any): Observable<IToken> {
        const userApp = 'frontend';
        const passwordApp = '12345';
        const credentials = `${userApp}:${passwordApp}`;
        const encodedCredentials = btoa(credentials);
        const url = `${environment.apiUrl}${environment.token}`;
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Basic ${encodedCredentials}`);
        const body = new HttpParams()
            .set('username', user)
            .set('password', password)
            .set('grant_type', 'password');
        return this.httpService.doPost(url, body.toString(), { headers });
    }
}