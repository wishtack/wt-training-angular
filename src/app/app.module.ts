import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { BookListContainerComponent } from './book/book-list-container/book-list-container.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookSearchComponent } from './book/book-search/book-search.component';
import { CartComponent } from './cart/cart/cart.component';
import { DemoComponent } from './demo/demo/demo.component';

@NgModule({
    declarations: [
        AppComponent,
        BookFormComponent,
        BookListContainerComponent,
        BookListComponent,
        DemoComponent,
        BookSearchComponent,
        CartComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
