export class Page {
  public id: number;
  public items: string[];

  constructor(_id: number, _items: string[]) {
    this.id = _id;
    this.items = _items;
  }
}
