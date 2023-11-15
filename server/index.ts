import express, { Express, Request, Response } from "express";
import multer from "multer";
import bodyParser from "body-parser";
import Logger from "./logger";

const app: Express = express();
app.use(bodyParser.json());

app.use(express.static(`${process.cwd()}/public`));
app.use(express.static(`${process.cwd()}/sandbox`));

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/sandbox/resized`);
  },
  filename: function (req, file, cb) {
    let imageName = req.body.imageName;
    if (file.mimetype === "image/jpeg") {
      imageName += ".jpg";
    } else if (file.mimetype === "image/png") {
      imageName += ".png";
    }
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

export type fileRequest = { file: { filename: string } };

app.post("/api", upload.single("uploadPhoto"), async (req, res) => {
  if (req.file) {
    Logger.info(
      `At ${new Date().toLocaleString()}, we got a chunk of a file for: ${
        req.file.filename
      }`
    );
  } else {
    Logger.info("req.file is undefined");
  }

  res.send("ok");
});

app.listen(8888, () => {
  console.log("web server is running on http://localhost:8888");
});
