import express from "express";
import { join, login } from "../controllers/userControllers";
import { trending, search } from "../controllers/videocontrollers";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
