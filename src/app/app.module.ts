import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Configuration } from './app.constants';
import { routing } from './app.routes';
import { HttpModule, JsonpModule } from '@angular/http';

import { SecurityService } from './services/SecurityService';
import { SecureFileService } from './securefile/SecureFileService';
import { BookingsService } from './bookings/BookingsService';
import { MenuSectionsService } from './bookings/MenuSectionsService';
import { DinerMenuItemsService } from './bookings/DinerMenuItemsService';

import { Booking } from '../shared/models/booking';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SecureFilesComponent } from './securefile/securefiles.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { BookingsListComponent } from './bookings/bookings-list.component';
import { BookingsCreateComponent } from './bookings/bookings-create.component';
import { BookingsEditComponent } from './bookings/bookings-edit.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { dateFormatPipe } from './../shared/components/pipes';
import { timeFormatPipe } from './../shared/components/pipes';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        JsonpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ForbiddenComponent,
        HomeComponent,
        UnauthorizedComponent,
        SecureFilesComponent,
        BookingsListComponent,
        BookingsCreateComponent,
        BookingsEditComponent,
        DashboardComponent,
        dateFormatPipe,
        timeFormatPipe
    ],
    providers: [
        SecurityService,
        SecureFileService,
        BookingsService,
        MenuSectionsService,
        DinerMenuItemsService,
        Configuration
    ],
    bootstrap:    [AppComponent],
})

export class AppModule {}
