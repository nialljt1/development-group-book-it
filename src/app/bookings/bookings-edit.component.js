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
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityService } from '../services/SecurityService';
import { BookingsService } from '../bookings/BookingsService';
var BookingsEditComponent = (function () {
    function BookingsEditComponent(_dataEventRecordsService, securityService, _route, _router) {
        this._dataEventRecordsService = _dataEventRecordsService;
        this.securityService = securityService;
        this._route = _route;
        this._router = _router;
        this.message = 'Bookings Edit';
    }
    BookingsEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('IsAuthorized:' + this.securityService.IsAuthorized());
        console.log('HasAdminRole:' + this.securityService.HasAdminRole);
        this.sub = this._route.params.subscribe(function (params) {
            var id = +params['id'];
            if (!_this.Booking) {
                _this._dataEventRecordsService.GetById(id)
                    .subscribe(function (data) { return _this.Booking = data; }, function (error) { return _this.securityService.HandleError(error); }, function () { return console.log('BookingsEditComponent:Get by Id complete'); });
            }
        });
    };
    BookingsEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BookingsEditComponent.prototype.Update = function () {
        var _this = this;
        this._dataEventRecordsService.Update(this.id, this.Booking)
            .subscribe((function () { return console.log('subscribed'); }), function (error) { return _this.securityService.HandleError(error); }, function () { return _this._router.navigate(['/bookings']); });
    };
    return BookingsEditComponent;
}());
BookingsEditComponent = __decorate([
    Component({
        selector: 'bookings-edit',
        templateUrl: 'bookings-edit.component.html'
    }),
    __metadata("design:paramtypes", [BookingsService,
        SecurityService,
        ActivatedRoute,
        Router])
], BookingsEditComponent);
export { BookingsEditComponent };
//# sourceMappingURL=bookings-edit.component.js.map