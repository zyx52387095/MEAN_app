import { Component } from '@angular/core';
import { User } from './user.model';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { UserHomeService } from "./user.home.service";
import { OnInit } from '@angular/core';
import { Book } from "../book/book.model"

@Component({
    templateUrl: './user.home.component.html'
})
export class UserHomeComponent {
    username: string;
    fullname: string;
    _books: Array<Book> = [];
    _availablebooks: Array<Book> = [];
    studentid: string;
    constructor(private authService: AuthService, private userhomeservice: UserHomeService, private router: Router) {
        this.username = authService.userName();
        this.fullname = authService.fullName();
        this.studentid = authService.stuentid();
        this.doInit();
    }
    doInit() {
        this._books = new Array<Book>();
        this._availablebooks = new Array<Book>();
        this.userhomeservice.getBooks(this.studentid).subscribe(
            val => {
                let bk: any;

                for (let bk of val.data) {
                    this._books.push(new Book(bk.title, bk.author, bk.isbn));
                }
            },
            error => { console.error(error) }
        );
        this.userhomeservice.getAvailableBooks().subscribe(
            val => {
                let bk: any;

                for (let bk of val.data) {
                    this._availablebooks.push(new Book(bk.title, bk.author, bk.isbn));
                }
            },
            error => { console.error(error) }
        );
    }
    onRemove(isbn) {
        this._books.forEach((item, index) => {
            if (item.isbn === isbn) {
                this._availablebooks.push(new Book(item.title, item.author, item.isbn));
                this._books.splice(index, 1);
            }
        });
    }
    onSave() {
        let obj = { books: this._books };
        this.userhomeservice.save(this.studentid, obj).subscribe(
            val => {
                console.log('saved');
            },
            error => { console.error(error) }
        );
    }
    onReset() {
        this.doInit();
    }
    onAdd(isbn) {
        this._availablebooks.forEach((item, index) => {
            if (item.isbn === isbn) {
                this._books.push(new Book(item.title, item.author, item.isbn));
                this._availablebooks.splice(index, 1);
            }
        });
    }
}