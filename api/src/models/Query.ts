import { pages } from "../routes";

interface TableScanResult {
  items: string[];
  cost: number;
}

export class Query {
  static tableScan(item: string): TableScanResult {
    const result: string[] = [];
    let cost: number = 0;

    for (const page of pages) {
      cost++;
      for (const pageItem of page.items) {
        result.push(pageItem);
        if (pageItem === item) break;
      }
    }

    return { items: result, cost };
  }
}
