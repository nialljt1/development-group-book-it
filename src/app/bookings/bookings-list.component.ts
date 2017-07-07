import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/SecurityService';
import { Observable }       from 'rxjs/Observable';
import { Router } from '@angular/router';

import { BookingsService } from '../bookings/BookingsService';
import { Booking } from '../../shared/models/booking';

@Component({
    selector: 'bookings-list',
    templateUrl: 'bookings-list.component.html'
})

export class BookingsListComponent implements OnInit {

    public message: string;
    public Bookings: Booking[];

    constructor(
        private _dataEventRecordsService: BookingsService,
        public securityService: SecurityService,
        private _router: Router) {
        this.message = 'Bookings';
    }

    ngOnInit() {
        this.getData();
    }

    public Delete(id: any) {
        console.log('Try to delete' + id);
        this._dataEventRecordsService.Delete(id)
            .subscribe((() => console.log('subscribed')),
            error => this.securityService.HandleError(error),
            () => this.getData());
    }

    private getData() {
        console.log('BookingsListComponent:getData starting...');
        this._dataEventRecordsService
            .GetAll()
            .subscribe(data => this.Bookings = data,
            error => this.securityService.HandleError(error),
            () => console.log('Get all completed'));
    }

}
