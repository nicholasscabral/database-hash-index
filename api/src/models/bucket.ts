export const BUCKET_SIZE: number = 5;

export interface Reference {
  [key: string]: number;
}

export class Bucket {
  public id: number;
  public refs: Reference[][];

  constructor(id: number) {
    this.id = id;
    this.refs = [[]];
  }

  addRef(ref: Reference): { colissions: number; overflows: number } {
    let colissions = 0;
    let overflows = 0;

    if (this.refs[this.refs.length - 1].length < BUCKET_SIZE) {
      this.refs[this.refs.length - 1].push(ref);
    } else {
      overflows++;
      this.refs.push([ref]);
    }
    if (this.refs.length > 1) {
      colissions++;
    }

    return { colissions, overflows };
  }
}
