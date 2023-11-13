import express, { Express, Request, Response } from "express";
import multer from "multer";
import bodyParser from "body-parser";
import Logger from "./logger";

const app: Express = express();
app.use(bodyParser.json());

app.use(express.static(`${process.cwd()}/public`));

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const storage = multer.diskStorage({
  destination: function (req: any, file, cb) {
    //cb(null, `${process.cwd()}/public`); this breaks, because the "public" folder has already been kind of "siezed" by the vite build.
    cb(null, `${process.cwd()}/sandbox`); //this works
  },
  filename: function (req, file, cb) {
    let imageName = `${req.body.imageName}.jpg`;

    cb(null, imageName);
  },
});
const fileFilter = (req, file, cb) => {
  cb(null, true);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 16,
  },
  fileFilter: fileFilter,
});

app.post("/api", upload.single("uploadPhoto"), (req: any, res: Response) => {
  if (req.file) {
    Logger.info(
      `At ${new Date().toLocaleString()}, we got a chunk of a file for: ${
        req.file.filename
      }`
    );
  } else {
    Logger.info("req.file is undefined");
  }

  res.json({ status: "ok" });
});
app.use(function (err, req, res, next) {
  Logger.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8888, () => {
  console.log(" web server is running on http://localhost:8888");
});
