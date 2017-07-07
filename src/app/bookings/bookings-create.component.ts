import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../services/SecurityService';

import { BookingsService } from '../bookings/BookingsService';
import { Booking } from '../../shared/models/booking';

@Component({
    selector: 'bookings-create',
    templateUrl: 'bookings-create.component.html'
})

export class BookingsCreateComponent implements OnInit {

    public message: string;
    public Booking: any;

    constructor(private _dataEventRecordsService: BookingsService, public securityService: SecurityService, private _router: Router) {
        this.message = 'Bookings Create';
    }

    ngOnInit() {
        this.Booking = { Id: 0, Name: '', Description: '' };
        console.log('IsAuthorized:' + this.securityService.IsAuthorized());
        console.log('HasAdminRole:' + this.securityService.HasAdminRole);
    }

    public Create() {
        // router navigate to BookingsList
        this._dataEventRecordsService
            .Add(this.Booking)
            .subscribe((data: any) => this.Booking = data,
            error => this.securityService.HandleError(error),
            () => this._router.navigate(['/booking']));
    }
}
