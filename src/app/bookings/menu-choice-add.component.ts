import { NotificationsService } from 'angular2-notifications';
import { DinerMenuItemsService } from './DinerMenuItemsService';
import { DinerMenuItem } from './../../shared/models/dinerMenuItem';
import { MenuSection } from './../../shared/models/menuSection';
import { Diner } from './../../shared/models/diner';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'menu-choice-add',
  templateUrl: 'menu-choice-add.component.html'
})
export class MenuChoiceAddComponent implements OnInit, OnChanges {

    public selectedMenuSectionId : number = 0;
    public selectedMenuSection : MenuSection;
    @Input()
    public menuSections: MenuSection[];
    @Input()
    public diner: Diner;

    constructor(
        private _dinerMenuItemsService: DinerMenuItemsService,
        private _notificationsService: NotificationsService
    ) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }


    menuSectionsOnChange() {
      if (this.selectedMenuSectionId > 0)
      {
        this.selectedMenuSection = this.menuSections.find(s => s.id == this.selectedMenuSectionId);
        console.log(this.selectedMenuSection);
      }
    }

    addMenuItem(id: number) {
      var dinerMenuItem = new DinerMenuItem();
      dinerMenuItem.dinerId = this.diner.id;
      dinerMenuItem.menuItemId = id;
      // TODO: need to handle notes
      this._dinerMenuItemsService.Add(dinerMenuItem)
          .subscribe(response =>
            {
              var menuSection = this.menuSections.find(s => s.id == this.selectedMenuSectionId);
              var menuItem = menuSection.menuItems.find(i => i.id == response.json().menuItemId);
              menuItem.menuSectionName = this.selectedMenuSection.name;
              menuItem.menuSection = this.selectedMenuSection;
              menuItem.dinerMenuItemId = response.json().id;
              this.diner.menuItems.push(menuItem);
              this.diner.menuItems.sort(a => a.menuSection.displayOrder);
              this._notificationsService.success('Menu Choice Added', 'You have successfully added ' + menuItem.name + ' as a menu choice.');
            }
          );
    }
}
