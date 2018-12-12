import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../form-demo/form-demo.component';

@Component({
    selector: 'wt-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnDestroy, OnInit {

    cityList = [
        'Dijon',
        'Lyon'
    ];

    title = 'Hello!';

    private _subscription: Subscription;

    constructor(private _httpClient: HttpClient) {
    }

    ngOnInit() {

        this._subscription = this._httpClient.get('https://www.googleapis.com/books/v1/volumes?q=eXtreme%20Programming')
            .subscribe(data => {
                console.log(data);
            });


        // const data$ = interval(100)
        //     .pipe(
        //         map(data => data % 10),
        //         filter(data => data !== 0),
        //         bufferTime(500),
        //         tap(data => {
        //             if (data[0] === 4) {
        //                 throw new Error('test');
        //             }
        //         })
        //     );
        //
        // const subscription = data$
        //     .pipe(
        //         retry(2)
        //     )
        //     .subscribe({
        //         next: data => console.log(data),
        //         error: err => console.log('Something went wrong'),
        //         complete: () => {
        //             console.log('DONE');
        //         }
        //     });
        //
        // setTimeout(() => subscription.unsubscribe(), 2000);

        // try {
        //
        //     const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=eXtreme%20Programming');
        //
        //     const data = await response.json();
        //
        //     console.log(data);
        //
        // } catch (e) {
        //     console.log('ERROR');
        // }

        // function wait(duration) {
        //     return new Promise(resolve => {
        //        setTimeout(resolve, duration);
        //     });
        // }
        //
        // await wait(1000);

        // fetch('https://www.googleapis.com/books/v1/volumes?q=eXtreme%20Programming')
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    reset() {
        this.title = '';
    }

    logUser(user: User) {
        console.log(user);
    }

}
