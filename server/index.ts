import express, { Express, Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import Logger from "./logger";

const app: Express = express();
app.use(bodyParser.json());

app.use(express.static(`${process.cwd()}/public`));

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/api/pics", (req: Request, res: Response) => {
  req.on("data", (data: any) => {
    Logger.info(
      `At ${new Date().toLocaleString()}, we got a chunk of a file with length: ${
        data.length
      }`
    );
  });
  res.json({ status: "ok" });
});
app.use(function (err, req, res, next) {
  Logger.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8888, () => {
  console.log(" web server is running on http://localhost:8888");
});
