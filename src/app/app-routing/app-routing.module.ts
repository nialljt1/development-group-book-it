import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsListComponent } from './../bookings/bookings-list.component';
import { BookingsEditComponent } from './../bookings/bookings-edit.component';

const routes: Routes = [
    {
            path: 'bookings',

            children: [
                { path: '', redirectTo: 'list', pathMatch: 'full'},
                {
                    path: 'edit/:id',
                    component: BookingsEditComponent
                },
                {
                    path: 'list',
                    component: BookingsListComponent,
                }
            ]
        }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
