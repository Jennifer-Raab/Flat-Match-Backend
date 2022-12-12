import { Router } from "express";
import {
    insertFavorite,
    getFavoriteList
} from "../controllers/FavoritesController.js";
import verifyToken from '../middlewares/verifyToken.js';

const favoritesRouter = Router();

favoritesRouter.route("/user/:userId").get(verifyToken, getFavoriteList);
favoritesRouter.route("/create").post(verifyToken, insertFavorite);

export default favoritesRouter;