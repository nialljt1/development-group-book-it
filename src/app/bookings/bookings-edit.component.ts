import { Diner } from './../../shared/models/diner';
import { MenuSection } from './../../shared/models/menuSection';
import { MenuSectionsService } from './MenuSectionsService';
import { DinerMenuItemsService } from './DinerMenuItemsService';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityService } from '../services/SecurityService';

import { BookingsService } from '../bookings/BookingsService';
import { Booking } from '../../shared/models/booking';
import { MenuSections } from '../../shared/models/menuSections';
import { DinerMenuItems } from '../../shared/models/dinerMenuItems';
import { DinerMenuItem } from '../../shared/models/dinerMenuItem';
import { MenuSectionMenuItem } from '../../shared/models/menuSectionMenuItem';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'bookings-edit',
    templateUrl: 'bookings-edit.component.html'
})

export class BookingsEditComponent implements OnInit, OnDestroy   {

    private id: string;
    public message: string;
    private sub: any;
    public booking: Booking;
    public menuSections: MenuSection[];
    public dinerMenuItems: DinerMenuItem[];
    public _booking: Observable<Booking>;
    public downloadUrl : string;
    public diner: Diner;
    public showEditPanel : boolean = false;

    constructor(
        private _bookingsService: BookingsService,
        private _menuSectionsService: MenuSectionsService,
        private _dinerMenuItemsService: DinerMenuItemsService,
        public securityService: SecurityService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.message = 'Bookings Edit';
    }

  deleteSelected(){
    alert(this.selectedOptions());
  }

  allChecked() {
    return this.booking.diners.filter(d => !d.checked).length == 0;
  }

  editDiner(id: number)
  {
    this.showEditPanel = true;
    console.log('id=' + id)
    this.diner = this.booking.diners.find(d => d.id == id);
    console.log('this.diner=' + this.diner)
  }

  showAllDiners(){
    this.showEditPanel = false;
    this.diner = null;
  }

  selectAll(){
    var hasUnchecked = this.booking.diners.filter(d => !d.checked).length > 0;
    this.booking.diners.forEach(diner => { diner.checked = hasUnchecked
    });
  }

  selectedOptions() { // right now: ['1','3']
    return this.booking.diners
              .filter(opt => opt.checked)
              .map(opt => opt.id);
  }

    ngOnInit() {
        console.log('IsAuthorized:' + this.securityService.IsAuthorized());
        console.log('HasAdminRole:' + this.securityService.HasAdminRole);
        this.sub = this._route.params.subscribe(params => {
            let id = params['id'];
            this.downloadUrl =  this._bookingsService.actionUrl + 'excel-export/' + id;
            if (!this.booking) {

                this._bookingsService.GetById(id)
                    .subscribe(json =>
                    {
                      this.booking = new Booking().deserialize(json.data, json.included);
                      this._menuSectionsService.GetForMenu(this.booking.menuId)
                      .subscribe(json =>
                      {
                        this.menuSections = new MenuSections().deserialize(json);
                      },
                      error => this.securityService.HandleError(error),
                      () => console.log('menuSections get complete'));

                      this._dinerMenuItemsService.GetForBooking(this.booking.id)
                      .subscribe(json =>
                      {
                        this.dinerMenuItems = new DinerMenuItems().deserialize(json.data, json.included);

                        this.booking.diners.forEach(diner =>
                        {
                          var dinerMenuItems = this.dinerMenuItems.filter(i => i.dinerId == diner.id);

                          this.menuSections.forEach(menuSection =>
                          {
                            var menuSectionMenuItem = new MenuSectionMenuItem();
                            menuSectionMenuItem.menuSectionId = menuSection.id;
                            menuSectionMenuItem.displayOrder = menuSection.displayOrder;
                            menuSectionMenuItem.menuSectionName = menuSection.name;
                            menuSectionMenuItem.dinerMenuItems = dinerMenuItems
                            .filter(i => i.menuItem.menuSectionId == menuSection.id);
                            diner.menuSectionMenuItems.push(menuSectionMenuItem);
                          });

                        });
                      },
                      error => this.securityService.HandleError(error),
                      () => console.log('dinerMenuItems get complete'));

                      console.log(this.booking);
                    },
                    error => this.securityService.HandleError(error),
                    () => console.log('booking Get complete'));
            }
            if (this.booking)
            {

            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public Update() {
        // router navigate to BookingsList
        this._bookingsService.Update(this.id, this.booking)
            .subscribe((() => console.log('subscribed')),
            error => this.securityService.HandleError(error),
            () => this._router.navigate(['/bookings']));
    }
}
