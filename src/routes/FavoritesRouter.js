import { Router } from "express";
import {
  insertFavorite,
  getFavoriteList,
  deleteFavorite,
} from "../controllers/FavoritesController.js";
import verifyToken from "../middlewares/verifyToken.js";

const favoritesRouter = Router();

favoritesRouter.route("/user/:userId").get(verifyToken, getFavoriteList);
favoritesRouter.route("/create").post(verifyToken, insertFavorite);
favoritesRouter
  .route("/delete/:favoriteId")
  .delete(verifyToken, deleteFavorite);

export default favoritesRouter;
