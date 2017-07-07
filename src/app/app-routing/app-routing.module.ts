import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { BookingsListComponent } from './../bookings/bookings-list.component';
import { BookingsCreateComponent } from './../bookings/bookings-create.component';
import { BookingsEditComponent } from './../bookings/bookings-edit.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
            path: 'bookings',

            children: [
                { path: '', redirectTo: 'list', pathMatch: 'full'},
                {
                    path: 'create',
                    component: BookingsCreateComponent
                },
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
