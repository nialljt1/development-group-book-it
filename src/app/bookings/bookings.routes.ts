import { Routes, RouterModule } from '@angular/router';
import { BookingsListComponent } from './bookings-list.component';
import { BookingsEditComponent } from './bookings-edit.component';

export const DATA_RECORDS_ROUTES: Routes = [
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
