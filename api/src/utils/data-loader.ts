import * as fs from "fs";

export class DataLoader {
  static load() {
    const data: string = fs.readFileSync("src/words_alpha.txt", "utf8");
    return data.split("\n").map((item: string) => item.trim());
  }
}
