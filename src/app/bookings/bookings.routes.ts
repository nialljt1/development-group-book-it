import { Routes, RouterModule } from '@angular/router';
import { BookingsListComponent } from './bookings-list.component';
import { BookingsCreateComponent } from './bookings-create.component';
import { BookingsEditComponent } from './bookings-edit.component';

export const DATA_RECORDS_ROUTES: Routes = [
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