import { DinerMenuItem } from './dinerMenuItem';

export class MenuSectionMenuItem {
  menuSectionId: number;
  menuSectionName: string;
  dinerMenuItems: DinerMenuItem[];
  displayOrder: number;

  constructor() {
  }
}
