/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { NgModule } from '@angular/core';
import { UserSelectorComponent } from './user-selector/user-selector.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
    declarations: [
        UserListComponent,
        UserSelectorComponent
    ],
    exports: [
        UserListComponent,
        UserSelectorComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class UserModule {
}
