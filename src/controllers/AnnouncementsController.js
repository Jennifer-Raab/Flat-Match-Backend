// import Announcements from "../models/Announcements.js";

import pool from "../db/db.js";


export const getAllAnnouncements = async (req, res, next) => { // not used by App but for testing purposes in the beginning
    try {
        const {rows: announcements} = await pool.query(`SELECT * FROM announcements`);
        // console.log(pool);
        console.log(announcements);
        res.status(200).json(announcements);
    } catch (err) {
        next(err);
    }

  };

export const getAllAnnouncementsByType = async (req, res, next) => {
    try {
        const { announcementType } = req.params;
        const { rows: announcementsByType } = await pool.query(`SELECT * FROM announcements WHERE type = '${announcementType}' AND active = true`);
        console.log(announcementsByType);
        res.status(200).json(announcementsByType);
    } catch (err) {
      next(err);
    }
  };
  export const getSingleAnnouncement = async (req, res, next) => {
    try {
      const { announcementId } = req.params;
      const {rows: [announcementsById]} = await pool.query(`SELECT * FROM announcements WHERE id = ${announcementId} AND active = true`);
      console.log("ID", announcementsById);
      res.status(200).json(announcementsById);
    } catch (error) {
        next(err);
    }
  };