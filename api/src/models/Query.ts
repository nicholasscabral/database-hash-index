import { buckets, pages } from "../routes";
import { hash } from "../utils/hash";
import { BUCKET_SIZE } from "./bucket";

interface TableScanResult {
  items: string[];
  cost: number;
}

interface hashSearchResult {
  items: string[];
  cost: number;
}

export class Query {
  static tableScan(item: string): TableScanResult {
    const result: string[] = [];
    let cost: number = 0;

    let found = false
    for (const page of pages) {
        cost++
        for (const pageItem of page.items) {
            result.push(pageItem);
            if (pageItem === item) {
                found = true;
                break;
            }
        }
        if (found) {
            break;
        }
    }

    return { items: result, cost };
  }

  static hashSearch(item: string): hashSearchResult {
    const numBuckets: number = Math.ceil(
      pages.reduce((a, c) => a + c.items.length, 0) / BUCKET_SIZE
    );
    const hashWord = hash(item, numBuckets)

    const findedBucket = buckets[hashWord]
    let indexPage = 0
    for (let ref of findedBucket.refs) {
      let tupla = ref.find(obj => obj.hasOwnProperty(item))
      if (tupla) {
        indexPage = tupla[item]
        break
      }
    }

    const findedPage = pages[indexPage]
    const result: string[] = [];
    let cost: number = 1;

    for(let word of findedPage.items) {
      result.push(word)
      if (item === word) {
        break;
      }
    }

    return { items: result, cost };
  }
}
