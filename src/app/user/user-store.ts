/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { User } from './user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
/**
 * @todo lots of things to factorize here. sorry...
 */
export class UserStore {

    private static _RESOURCE_URL = 'http://wt-users.getsandbox.com/users';

    private _userList$ = new BehaviorSubject<User[]>([]);

    constructor(private _http: Http) {

        window.addEventListener('storage', (event) => {

            if (event.key !== 'wtUserList') {
                return;
            }

            const userList = JSON.parse(event.newValue).map((data) => new User(data));

            this._userList$.next(userList);

        });

    }

    get userList$() {
        return this._userList$.asObservable();
    }

    getUserList(): Observable<User[]> {

        return this._http
            .get(UserStore._RESOURCE_URL)
            .map((response) => {
                return response.json().map((data) => new User(data));
            })
            .do((userList) => this._updateUserList(userList));

    }

    getUser(userId: string) {

        return this._http
            .get(`${UserStore._RESOURCE_URL}/${userId}`)
            .map((response) => new User(response.json()));

    }

    addUser(user: User): Observable<User> {

        return this._http
            .post(UserStore._RESOURCE_URL, user)
            .map((response) => new User(response.json()))
            .do((_user) => this._updateUserList([...this._userList$.value, _user]));

    }

    removeUser(userId: string): Observable<null> {

        return this._http
            .delete(`${UserStore._RESOURCE_URL}/${userId}`)
            .map(() => null)
            .do(() => {
                const userList = this._userList$.value
                    .filter((_user) => _user.id !== userId);
                this._updateUserList(userList);
            });

    }

    updateUser(user: User) {

        /* PATCH /users/:userId. */
        return this._http.patch(`${UserStore._RESOURCE_URL}/${user.id}`, user)
            .map((response) => new User(response.json()))
            .do((updatedUser) => {
                const userList = this._userList$.value
                    .map((_user) => _user.id === updatedUser.id ? updatedUser : _user);
                this._updateUserList(userList);
            });

    }

    private _updateUserList(userList) {
        localStorage.setItem('wtUserList', JSON.stringify(userList));
        this._userList$.next(userList);
    }

}
