import express from "express";
import {
  deleteUser,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userControllers";
import {
  protectroMiddleware,
  publicOnlyMiddleware,
  avartarUpload,
} from "../middlewares";
const userRouter = express.Router();

userRouter.get("/logout", protectroMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectroMiddleware)
  .get(getEdit)
  .post(avartarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectroMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/delete", deleteUser);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

userRouter.get(":id", see);

export default userRouter;
