var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SecurityService } from '../services/SecurityService';
import { Router } from '@angular/router';
import { BookingsService } from '../bookings/BookingsService';
var BookingsListComponent = (function () {
    function BookingsListComponent(_dataEventRecordsService, securityService, _router) {
        this._dataEventRecordsService = _dataEventRecordsService;
        this.securityService = securityService;
        this._router = _router;
        this.message = 'Bookings';
    }
    BookingsListComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    BookingsListComponent.prototype.Delete = function (id) {
        var _this = this;
        console.log('Try to delete' + id);
        this._dataEventRecordsService.Delete(id)
            .subscribe((function () { return console.log('subscribed'); }), function (error) { return _this.securityService.HandleError(error); }, function () { return _this.getData(); });
    };
    BookingsListComponent.prototype.getData = function () {
        var _this = this;
        console.log('BookingsListComponent:getData starting...');
        this._dataEventRecordsService
            .GetAll()
            .subscribe(function (data) { return _this.Bookings = data; }, function (error) { return _this.securityService.HandleError(error); }, function () { return console.log('Get all completed'); });
    };
    return BookingsListComponent;
}());
BookingsListComponent = __decorate([
    Component({
        selector: 'bookings-list',
        templateUrl: 'bookings-list.component.html'
    }),
    __metadata("design:paramtypes", [BookingsService,
        SecurityService,
        Router])
], BookingsListComponent);
export { BookingsListComponent };
//# sourceMappingURL=bookings-list.component.js.map