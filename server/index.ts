import express, { Express, Request, Response } from "express";
import router from "./apiRouter";
import bodyParser from "body-parser";
import Logger from "./logger";

const app: Express = express();
app.use(bodyParser.json());

app.use(express.static(`${process.cwd()}/public`));
app.use(express.static(`${process.cwd()}/sandbox`));

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", router);
app.use(function (err, req, res, next) {
  Logger.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8888, () => {
  console.log(" web server is running on http://localhost:8888");
});
