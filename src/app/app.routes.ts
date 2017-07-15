import { Routes, RouterModule } from '@angular/router';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SecureFilesComponent } from './securefile/securefiles.component';

import { DATA_RECORDS_ROUTES } from './bookings/bookings.routes';

import { BookingsListComponent } from './bookings/bookings-list.component';
import { BookingsEditComponent } from './bookings/bookings-edit.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'Forbidden', component: ForbiddenComponent },
    { path: 'Unauthorized', component: UnauthorizedComponent },
    { path: 'securefile/securefiles', component: SecureFilesComponent },
    { path: 'welcome/welcome', component: WelcomeComponent },
    { path: 'restaurant/restaurant', component: RestaurantComponent },
    ...DATA_RECORDS_ROUTES,
];

export const routing = RouterModule.forRoot(appRoutes);
