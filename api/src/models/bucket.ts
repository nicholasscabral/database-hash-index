export const BUCKET_SIZE: number = 5;

export interface Reference {
  [key: string]: number;
}

export class Bucket {
  public id: number;
  public refs: Reference[];

  constructor(id: number) {
    this.id = id;
    this.refs = [];
  }

  addRef(ref: Reference): void {
    // TODO handle colission
    if (this.refs.length < BUCKET_SIZE) {
      this.refs.push(ref);
    }
  }
}
