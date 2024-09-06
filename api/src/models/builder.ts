import { hash } from "../utils/hash";
import { Bucket, BUCKET_SIZE } from "./bucket";
import { Page } from "./page";

export interface CreateBucketResult {
  colissions: number;
  overflows: number;
  buckets: Bucket[];
}

export class Builder {
  static createPages(items: string[], pageSize: number): Page[] {
    const pages: Page[] = [];
    let pageId = 0;

    for (let i = 0; i < items.length; i += pageSize) {
      const pageItems = items.slice(i, i + pageSize);
      const page = new Page(pageId++, pageItems);
      pages.push(page);
    }

    return pages;
  }

  static createBuckets(pages: Page[]): CreateBucketResult {
    const numBuckets: number = Math.ceil(
      pages.reduce((a, c) => a + c.items.length, 0) / BUCKET_SIZE
    );
    const buckets: Bucket[] = Array.from(
      { length: numBuckets },
      (_, i) => new Bucket(i)
    );

    let colissions: number = 0;
    let overflows: number = 0;

    for (const page of pages) {
      for (const item of page.items) {
        const hashedValue: number = hash(item, numBuckets);

        const { colissions: addedColission, overflows: addedOverflow } =
          buckets[hashedValue].addRef({ [item]: page.id });

        colissions += addedColission;
        overflows += addedOverflow;
      }
    }

    return { overflows, colissions, buckets };
  }
}
