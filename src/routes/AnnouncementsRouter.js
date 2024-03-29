import { Router } from "express";
import {
  getAllAnnouncements,
  getAllAnnouncementsByType,
  getSingleAnnouncement,
  getAllAnnouncementsByTypeAndUserId,
  getLikedAnnouncementsByTypeAndUserId,
} from "../controllers/AnnouncementsController.js";
import verifyToken from "../middlewares/verifyToken.js";

const announcementsRouter = Router();

// TEST
announcementsRouter.route("/").get(getAllAnnouncements);

// get all Flats Router
announcementsRouter.route("/:announcementType").get(getAllAnnouncementsByType);

// get single flat router
announcementsRouter.route("/single/:announcementId").get(getSingleAnnouncement);

// get all Flats by user Id and Type Router
announcementsRouter
  .route("/:announcementType/:userId")
  .get(verifyToken, getAllAnnouncementsByTypeAndUserId);

// get all Flats by user Id and Type Router
announcementsRouter
  .route("/liked/:announcementType/:userId")
  .get(verifyToken, getLikedAnnouncementsByTypeAndUserId);

export default announcementsRouter;
