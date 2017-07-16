import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { MenuItem } from './../../shared/models/menuItem';
import { DinerMenuItemsService } from './DinerMenuItemsService';
import { DinerMenuItem } from './../../shared/models/dinerMenuItem';
import { MenuSection } from './../../shared/models/menuSection';
import { Diner } from './../../shared/models/diner';
import { BookingsService } from '../bookings/BookingsService';
import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { ConfirmationDialogComponent } from "shared/components/confirmation/confirmation-dialog.component";

@Component({
  selector: 'diner-edit',
  templateUrl: 'diner-edit.component.html'
})

export class DinerEditComponent implements OnInit, OnChanges {
  dialogRef: MdDialogRef<ConfirmationDialogComponent>;

  constructor(
      private _dinerMenuItemsService: DinerMenuItemsService,
      private _notificationsService: NotificationsService,
      public dialog: MdDialog
  ) {

  }

    public showAddMenuItemPanel : boolean = false;
    @Input()
    public menuSections: MenuSection[];
    @Output() closeDiner = new EventEmitter();
    @Input()
    public diner: Diner;

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    showAddMenuItem() {
      this.showAddMenuItemPanel = true;
    }

    sortedMenuItems(){
      if (this.diner && this.diner.menuItems)
      {
        return this.diner.menuItems.sort((m1: MenuItem, m2: MenuItem) => {
          if (m1.menuSection.displayOrder > m2.menuSection.displayOrder) {
              return 1;
          }

          if (m1.menuSection.displayOrder < m2.menuSection.displayOrder) {
              return -1;
          }

          if (m1.displayOrder > m2.displayOrder) {
              return 1;
          }

          if (m1.displayOrder < m2.displayOrder) {
              return -1;
          }

          return 0;
          });
    }
  }

  showAllDiners(){
    this.closeDiner.emit();
  }

  deleteSelectedMenuItems(){
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false
      });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.performDelete();
      }
      this.dialogRef = null;
    });
  }

  performDelete() {
    var selectedOptions =   this.diner.menuItems
    .filter(opt => opt.checked)
    .map(opt => opt.dinerMenuItemId);
    selectedOptions.forEach(dinerMenuItemId => {
      this._dinerMenuItemsService.Delete(dinerMenuItemId)
      .subscribe(response =>
            {
              console.log(response);
              for(var i = this.diner.menuItems.length - 1; i >= 0; i--) {
                  if(this.diner.menuItems[i].dinerMenuItemId === dinerMenuItemId) {
                    this.diner.menuItems.splice(i, 1);
                  }
              }

              this._notificationsService.success('Menu Choice Deleted', 'You have successfully deleted the selected menu choice.');
            }
          );
    });
  }

  selectAllMenuItems(){
    var hasUnchecked = this.diner.menuItems.filter(d => !d.checked).length > 0;
    this.diner.menuItems.forEach(menuItem => { menuItem.checked = hasUnchecked
    });
  }

  allCheckedMenuItems(){
    return this.diner.menuItems.filter(d => !d.checked).length == 0;
  }
}


