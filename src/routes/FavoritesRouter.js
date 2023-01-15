import { Router } from "express";
import {
  insertFavorite,
  getFavoriteList,
  getMatchesList,
  deleteFavorite,
  changeFavoriteText,
} from "../controllers/FavoritesController.js";
import verifyToken from "../middlewares/verifyToken.js";

const favoritesRouter = Router();

favoritesRouter.route("/user/:userId").get(verifyToken, getFavoriteList);
favoritesRouter.route("/matches/:userId").get(verifyToken, getMatchesList);
favoritesRouter.route("/create").post(verifyToken, insertFavorite);
favoritesRouter
  .route("/delete/:favoriteId")
  .delete(verifyToken, deleteFavorite);
favoritesRouter
  .route("/change/:favoriteId")
  .put(verifyToken, changeFavoriteText);

export default favoritesRouter;
