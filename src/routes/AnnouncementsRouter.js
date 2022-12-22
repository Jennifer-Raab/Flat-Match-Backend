import { Router } from "express";
import {
  getAllAnnouncements,
  getAllAnnouncementsByType,
  getSingleAnnouncement,
  getAllAnnouncementsByTypeAndUserId,
} from "../controllers/AnnouncementsController.js";

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
  .get(getAllAnnouncementsByTypeAndUserId);
export default announcementsRouter;
