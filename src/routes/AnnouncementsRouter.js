import { Router } from "express";
import {
getAllAnnouncements,
  getAllAnnouncementsByType,
  getSingleAnnouncement,
} from "../controllers/AnnouncementsController.js";

const announcementsRouter = Router();

// TEST
announcementsRouter.route("/").get(getAllAnnouncements);

// get all Flats Router
announcementsRouter.route("/:announcementType").get(getAllAnnouncementsByType);

// get single flat router
announcementsRouter.route("/:announcementId").get(getSingleAnnouncement);


export default announcementsRouter;