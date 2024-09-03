import { pages } from "../routes";

interface TableScanResult {
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
}
