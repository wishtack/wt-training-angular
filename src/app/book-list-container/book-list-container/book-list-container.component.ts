import { Component } from '@angular/core';
import { Book } from '../../book-comon/book';
import { CartService } from '../../cart/cart.service';

@Component({
    selector: 'wt-book-list-container',
    templateUrl: './book-list-container.component.html'
})
export class BookListContainerComponent {

    constructor(private _cart: CartService) {
    }

    addBook(book: Book) {
        this._cart.addBook(book);
    }

    getBookList() {
        return this._cart.getBookList();
    }

    removeBook(book: Book) {
        this._cart.removeBook(book);
    }

}
