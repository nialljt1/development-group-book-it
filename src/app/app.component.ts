import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Configuration } from './app.constants';

import { SecurityService } from './services/SecurityService';
import { SecureFileService } from './securefile/SecureFileService';
import { BookingsService } from './bookings/BookingsService';
import { MenuSectionsService } from './bookings/MenuSectionsService';
import { DinerMenuItemsService } from './bookings/DinerMenuItemsService';
import { Booking } from '../../src/shared/models/booking'

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SecureFilesComponent } from './securefile/securefiles.component';

import { BookingsListComponent } from './bookings/bookings-list.component';
import { BookingsEditComponent } from './bookings/bookings-edit.component';

import './app.component.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

    title = "app";

    constructor(public securityService: SecurityService, public router: Router) {
    }

    ngOnInit() {
        console.log('ngOnInit _securityService.AuthorizedCallback');

        if (window.location.hash) {
            this.securityService.AuthorizedCallback();
        }
    }


    public List() {
        this.router.navigate(['/bookings/list']);
    }

    public Edit() {
        this.router.navigate(['/bookings/edit/E166F9A4-5B7B-4C9E-6513-08D45597AED5']);
    }

    public Restaurant(){
      this.router.navigate(['/restaurant/restaurant/']);
    }

    public Welcome(){
      this.router.navigate(['/welcome/welcome/']);
    }

    public Login() {
        console.log('Do login logic');
        this.securityService.Authorize();
    }

    public Logout() {
        console.log('Do logout logic');
        this.securityService.Logoff();
    }
}
