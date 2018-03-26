import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Location } from '@angular/common';
import { AuthService } from "../auth/auth.service";
import { Book } from "../book/book.model";

import 'rxjs/Rx';
import { Observable } from "rxjs";

const headers = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export class UserHomeService {

    constructor(private http: Http, private authService: AuthService) {
    }

    getBooks(studentid: string) {
        return this.http.get('http://localhost/student/' + studentid + "?token=" + this.authService.token(), { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    getAvailableBooks() {
        return this.http.get('http://localhost/book/'+ "?token=" + this.authService.token(), { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    save(studentid: string, data) {
        const body = JSON.stringify(data);

        return this.http.post('http://localhost/student/' + studentid+ "?token=" + this.authService.token(), body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}