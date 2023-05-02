import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videocontrollers";
import { protectroMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectroMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectroMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/upload")
  .all(protectroMiddleware)
  .get(getUpload)
  .post(postUpload);

export default videoRouter;
