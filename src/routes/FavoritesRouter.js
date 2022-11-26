import { Router } from "express";
import {
    InsertFavorite
} from "../controllers/FavoritesController.js";
import verifyToken from '../middlewares/verifyToken.js';

const favoritesRouter = Router();


favoritesRouter.route("/create").post(verifyToken, InsertFavorite);

export default favoritesRouter;