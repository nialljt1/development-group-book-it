import { DinerMenuItem } from './dinerMenuItem';

export class DinerMenuItems {
list: DinerMenuItem[] = [];

deserialize(objectJson: Array<any>, included?: any): DinerMenuItem[] {
  // // console.log('test9');
  // // console.log(objectJson);
  // // console.log(included);
  for (let item of objectJson) {
    // // console.log('test7');
    // // console.log(item.included);
    let dinerMenuItem = new DinerMenuItem().deserialize(item, included);
    this.list.push(dinerMenuItem);
  }
  return this.list;
}
}
