import express, { Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(router);
app.listen(4000, () => console.log("Server started on port 4000"));
