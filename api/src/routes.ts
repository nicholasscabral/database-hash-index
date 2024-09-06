import { Request, Response, Router } from "express";
import { DataLoader } from "./utils/data-loader";
import { Page } from "./models/page";
import { Builder } from "./models/builder";
import { Bucket } from "./models/bucket";
import { Query } from "./models/Query";

export let pages: Page[] = [];
export let buckets: Bucket[] = [];

const router: Router = Router();

router.post("/init/:pageSize", (req: Request, res: Response) => {
  const pageSize: number = parseInt(req?.params?.pageSize);

  if (!pageSize) {
    return res.status(400).send("provide the page size");
  }

  const items: string[] = DataLoader.load();

  pages = Builder.createPages(items, pageSize);

  const {
    colissions,
    overflows,
    buckets: _buckets,
  } = Builder.createBuckets(pages);

  buckets = _buckets;

  return res.status(200).send({
    colissions,
    overflows,
  });
});

router.get("/tablescan/:item", (req: Request, res: Response) => {
  if (!req?.params?.item) {
    return res.status(400).send("provide the item");
  }

  return res.status(200).send(Query.tableScan(req.params.item));
});

router.get("/hashSearch/:item", (req: Request, res: Response) => {
  if (!req?.params?.item) {
    return res.status(400).send("provide the item");
  }

  return res.status(200).send(Query.hashSearch(req.params.item));
});

export default router;
