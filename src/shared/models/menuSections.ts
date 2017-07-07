import { MenuSection } from './menuSection';

export class MenuSections {
list: MenuSection[] = [];

deserialize(objectJson: Array<any>): MenuSection[] {
  for (let item of objectJson) {
    let menuSection = new MenuSection().deserialize(item);
    this.list.push(menuSection);
  }
  return this.list;
}
}
