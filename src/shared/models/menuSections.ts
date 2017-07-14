import { MenuSection } from './menuSection';

export class MenuSections {
list: MenuSection[] = [];

deserialize(objectJson: Array<any>, included?: any): MenuSection[] {
  for (let item of objectJson) {
    let menuSection = new MenuSection().deserialize(item, included);
    this.list.push(menuSection);
  }
  return this.list;
}
}


