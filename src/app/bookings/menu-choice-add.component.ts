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
      // TODO: add notification when menu item added
      this._dinerMenuItemsService.Add(dinerMenuItem)
          .subscribe(response =>
            {
              console.log(response);
              var menuItemId = response.json().menuItemId;
              var menuSection = this.menuSections.find(s => s.id == this.selectedMenuSectionId);
              var menuItem = menuSection.menuItems.find(i => i.id == menuItemId);
              menuItem.menuSectionName = this.selectedMenuSection.name;
              menuItem.menuSection = this.selectedMenuSection;
              this.diner.menuItems.push(menuItem);
              this.diner.menuItems.sort(a => a.menuSection.displayOrder);
              console.log(this.diner.menuItems);
            }
          );
    }
}
