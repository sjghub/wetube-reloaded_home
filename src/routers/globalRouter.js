import express from "express";
import { join, login } from "../controllers/userControllers";
import { home, search } from "../controllers/videocontrollers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
