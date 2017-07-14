import { MenuItem } from './../../shared/models/menuItem';
import { DinerMenuItem } from './../../shared/models/dinerMenuItem';
import { Diner } from './../../shared/models/diner';
import { MenuSection } from './../../shared/models/menuSection';
import { MenuSectionsService } from './MenuSectionsService';
import { DinerMenuItemsService } from './DinerMenuItemsService';

import { Component, OnInit, OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityService } from '../services/SecurityService';

import { BookingsService } from '../bookings/BookingsService';
import { Booking } from '../../shared/models/booking';
import { MenuSections } from '../../shared/models/menuSections';
import { DinerMenuItems } from '../../shared/models/dinerMenuItems';
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

                    this.setMenuSections();
                    this.setDinerMenuItems();

                    console.log(this.booking);
                  },
                  error => this.securityService.HandleError(error),
                  () => console.log('booking Get complete'));
          }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteSelected(){
    var selectedOptions =   this.booking.diners
              .filter(opt => opt.checked)
              .map(opt => opt.id);
    alert(selectedOptions);
  }

  closeEditDiner()
  {
    this.diner = null;
  }

  editDiner(id: number)
  {
    this.diner = this.booking.diners.find(d => d.id == id);
  }

  selectAll(){
    var hasUnchecked = this.booking.diners.filter(d => !d.checked).length > 0;
    this.booking.diners.forEach(diner => { diner.checked = hasUnchecked
    });
  }

  allChecked() {
    return this.booking.diners.filter(d => !d.checked).length == 0;
  }

  setMenuSections(){
    this._menuSectionsService.GetForMenu(this.booking.menuId)
    .subscribe(json =>
    {
      this.menuSections = new MenuSections().deserialize(json.data, json.included);
    },
    error => this.securityService.HandleError(error),
    () => console.log('menuSections get complete'));
  }

  setDinerMenuItems(){
    this._dinerMenuItemsService.GetForBooking(this.booking.id)
    .subscribe(json =>
    {
      this.dinerMenuItems = new DinerMenuItems().deserialize(json.data, json.included);
      this.setMenuItemsForDiners();
    },
    error => this.securityService.HandleError(error),
    () => console.log('dinerMenuItems get complete'));
  }

  setMenuItemsForDiners(){
      this.booking.diners.forEach(diner =>
      {
        var dinerMenuItems = this.dinerMenuItems.filter(i => i.dinerId == diner.id);
        diner.menuItems = dinerMenuItems.map(a => a.menuItem);

        diner.menuItems.forEach(i => {
          i.menuSection = this.menuSections.find(s => s.id == i.menuSectionId);
        });

        this.menuSections.forEach(menuSection =>
        {
          var menuSectionMenuItem = new MenuSectionMenuItem();
          menuSectionMenuItem.menuSectionId = menuSection.id;
          menuSectionMenuItem.displayOrder = menuSection.displayOrder;
          menuSectionMenuItem.menuSection = menuSection;
          menuSectionMenuItem.dinerMenuItems = dinerMenuItems
          .filter(i => i.menuItem.menuSectionId == menuSection.id);
          diner.menuSectionMenuItems.push(menuSectionMenuItem);
        });

      });
  }
}
