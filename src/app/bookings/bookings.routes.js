import { BookingsListComponent } from './bookings-list.component';
import { BookingsCreateComponent } from './bookings-create.component';
import { BookingsEditComponent } from './bookings-edit.component';
export var DATA_RECORDS_ROUTES = [
    {
        path: 'bookings',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
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
//# sourceMappingURL=bookings.routes.js.map