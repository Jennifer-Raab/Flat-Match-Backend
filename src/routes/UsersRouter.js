import { Router } from "express";
import {
    getSingleUserByEmail,
    getSingleUserByToken,
    putCurrentAnnouncement
} from "../controllers/UsersController.js";
import verifyToken from '../middlewares/verifyToken.js';

const usersRouter = Router();


usersRouter.route("/login").post(getSingleUserByEmail);
usersRouter.route("/me").get(verifyToken, getSingleUserByToken);
usersRouter.route("/current").put(verifyToken, putCurrentAnnouncement);



export default usersRouter;