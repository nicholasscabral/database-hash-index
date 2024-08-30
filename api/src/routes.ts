import { Request, Response, Router } from "express";
import { DataLoader } from "./utils/data-loader";
import { Page } from "./models/page";
import { Builder } from "./models/builder";
import { Bucket } from "./models/bucket";

let pages: Page[] = [];
let buckets: Bucket[] = [];

const router: Router = Router();

router.post("/init/:pageSize", (req: Request, res: Response) => {
  const pageSize: number = parseInt(req?.params?.pageSize);

  if (!pageSize) {
    return res.status(400).send("provide the page size");
  }

  const items: string[] = DataLoader.load();

  pages = Builder.createPages(items, pageSize);

  buckets = Builder.createBuckets(pages);

  console.log(buckets);

  // calculate colission and overflow

  return res.status(200).send();
});

export default router;
