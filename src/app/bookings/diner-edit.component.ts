import { MenuItem } from './../../shared/models/menuItem';
import { DinerMenuItemsService } from './DinerMenuItemsService';
import { DinerMenuItem } from './../../shared/models/dinerMenuItem';
import { MenuSection } from './../../shared/models/menuSection';
import { Diner } from './../../shared/models/diner';
import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'diner-edit',
  templateUrl: 'diner-edit.component.html'
})
export class DinerEditComponent implements OnInit, OnChanges {

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

  deleteSelectedMenuItems() {
    var selectedOptions =   this.diner.menuItems
              .filter(opt => opt.checked)
              .map(opt => opt.id);
    alert(selectedOptions);
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


