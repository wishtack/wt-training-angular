import { Component, ViewChild, ViewChildren } from '@angular/core';
import { UserStore } from '../../user-core/user-store';
import { User } from '../user';

@Component({
    selector: 'wt-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

    editedUser: User;

    constructor(private _userStore: UserStore) {
    }

    addUser(user: User) {
        this._userStore.addUser(user);
    }

    getUserList() {
        return this._userStore.getUserList();
    }

    updateUser(previousUser: User, newUser: User) {
        this._userStore.updateUser(previousUser, newUser);
        this.editedUser = null;
    }

}
