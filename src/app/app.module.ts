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
import { BookingsEditComponent } from './bookings/bookings-edit.component';
import { MenuChoiceAddComponent } from './bookings/menu-choice-add.component';
import { DinerEditComponent } from './bookings/diner-edit.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { dateFormatPipe } from './../shared/components/pipes';
import { timeFormatPipe } from './../shared/components/pipes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { WelcomeComponent } from "app/welcome/welcome.component";
import { RestaurantComponent } from "app/restaurant/restaurant.component";

@NgModule({
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        JsonpModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdMenuModule,
        MdCardModule,
        MdToolbarModule,
        MdIconModule
    ],
    declarations: [
        AppComponent,
        ForbiddenComponent,
        HomeComponent,
        UnauthorizedComponent,
        SecureFilesComponent,
        BookingsListComponent,
        BookingsEditComponent,
        MenuChoiceAddComponent,
        DinerEditComponent,
        WelcomeComponent,
        RestaurantComponent,
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
