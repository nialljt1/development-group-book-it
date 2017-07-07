export class MenuItem {
  menuSectionId: number;
  name: string;
  description: string;
  number: number;
  displayOrder: number;

  constructor() {
  }

  deserialize(objectJson: any) {
    if (!objectJson) return;
    var t = this, o = objectJson, a = o.attributes;
    if (o.type !== 'menu-items') throw new TypeError();

    t.menuSectionId = a.menuSectionId;
    t.name = a.name;
    t.description = a.description;
    t.number = a.number;
    t.displayOrder = a.displayOrder;
    return t;
  }
}
