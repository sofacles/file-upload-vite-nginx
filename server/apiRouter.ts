import express from "express";
import Logger from "./logger";
import multer from "multer";

const app = express();
const router = express.Router();

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

const addPaint = async (req, res) => {
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
};

const getPaint = (req, res) => {
  res.send("hello from api");
};

router.get("/", getPaint);
router.post("/", upload.single("uploadPhoto"), addPaint);

export default router;
