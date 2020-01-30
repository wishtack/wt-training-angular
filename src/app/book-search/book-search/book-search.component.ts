import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  onErrorResumeNext,
  pluck,
  scan,
  shareReplay,
  switchMap
} from 'rxjs/operators';
import { Book } from '../../cart/cart';
import { BookQuery } from '../book-query';
import { BookSearch } from '../book-search.service';

export const slide = <TItem>(windowSize: number) =>
  scan<TItem, TItem[]>(
    (history, query) => [...history, query].slice(-windowSize),
    []
  );

@Component({
  selector: 'mc-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  books$: Observable<Book[]>;
  history$: Observable<BookQuery[]>;

  private _query$ = new Subject<BookQuery>();

  constructor(
    private _bookSearch: BookSearch,
    private _httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    const result$ = this._query$.pipe(
      debounceTime(50),
      distinctUntilChanged((a, b) => {
        return (
          a.keywords === b.keywords &&
          a.language === b.language &&
          a.order === b.order
        );
      }),
      switchMap(query => {
        return this._bookSearch.search(query).pipe(
          map(books => ({
            books,
            query
          })),
          onErrorResumeNext()
        );
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

    const books$ = result$.pipe(pluck('books'));

    const successfulQuery$ = result$.pipe(pluck('query'));

    this.books$ = books$;
    this.history$ = successfulQuery$.pipe(
      slide(10)
    );
  }

  search(query: BookQuery) {
    this._query$.next(query);
  }
}
