export class MenuSection {
  id: number;
  menuId: number;
  name: string;
  notes: string;
  displayOrder: number;

  constructor() {
  }

  deserialize(objectJson: any) {
    if (!objectJson) return;
    var t = this, o = objectJson, a = o.attributes;
    if (o.type !== 'menu-sections') throw new TypeError();

    t.id = a.id;
    t.menuId = a.menuId;
    t.name = a.name;
    t.notes = a.notes;
    t.displayOrder = a.displayOrder;

    return t;
  }
}
