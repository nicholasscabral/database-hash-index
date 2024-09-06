/* eslint-disable no-prototype-builtins */
import { buckets, pages } from "../routes";
import { hash } from "../utils/hash";
import { BUCKET_SIZE } from "./bucket";

interface TableScanResult {
  items: string[];
  cost: number;
  pageNumber: number;
}

interface hashSearchResult {
  items: string[];
  cost: number;
  pageNumber: number;
}

export class Query {
  static tableScan(item: string): TableScanResult {
    const result: string[] = [];
    let cost: number = 0;
    let pageNumber: number = 0;

    let found = false;
    for (const [index, page] of pages.entries()) {
      cost++;
      for (const pageItem of page.items) {
        result.push(pageItem);
        if (pageItem === item) {
          found = true;
          pageNumber = index;
          break;
        }
      }
      if (found) {
        break;
      }
    }

    return { items: result, cost, pageNumber };
  }

  static hashSearch(item: string): hashSearchResult {
    const numBuckets: number = Math.ceil(
      pages.reduce((a, c) => a + c.items.length, 0) / BUCKET_SIZE
    );
    const hashWord = hash(item, numBuckets);

    const bucketFound = buckets[hashWord];
    let pageNumber = 0;
    for (const ref of bucketFound.refs) {
      const tuple = ref.find((obj) => obj.hasOwnProperty(item));
      if (tuple) {
        pageNumber = tuple[item];
        break;
      }
    }

    const pageFound = pages[pageNumber];
    const result: string[] = [];
    const cost: number = 1;

    for (const word of pageFound.items) {
      result.push(word);
      if (item === word) {
        break;
      }
    }

    return { items: result, cost, pageNumber };
  }
}
