import pool from "../db/db.js";

export const getAllAnnouncements = async (req, res, next) => {
  // not used by App but for testing purposes in the beginning
  try {
    // const {rows: announcements} = await pool.query(`SELECT * FROM announcements WHERE city LIKE $1`,  ['%' + req.body.city + '%']);
    const { rows: announcements } = await pool.query(
      `SELECT * FROM announcements`
    );
    // console.log(pool);
    console.log(announcements);
    res.status(200).json(announcements);
  } catch (err) {
    next(err);
  }
};

export const getAllAnnouncementsByType = async (req, res, next) => {
  try {
    let { city, numberOfPersons, rent } = req.query;
    const { announcementType } = req.params;
    console.log(req.body);
    let whereClause = "";
    const queryVariableArray = [announcementType];
    let i = 2;
    if (city) {
      city = `%${city}%`;
      whereClause += ` AND city LIKE $${i}`;
      queryVariableArray.push(city);
      i++;
    }
    if (numberOfPersons) {
      whereClause += ` AND number_of_persons = $${i}`;
      queryVariableArray.push(numberOfPersons);
      i++;
    }
    if (rent) {
      if (announcementType === "gesuch") {
        whereClause += ` AND rent >= $${i}`;
      }
      if (announcementType === "angebot") {
        whereClause += ` AND rent <= $${i}`;
      }
      queryVariableArray.push(rent);
      i++;
    }
    const { rows: announcementsByType } = await pool.query(
      `SELECT * FROM announcements WHERE type = $1${whereClause} AND active = true`,
      queryVariableArray
    );
    // console.log("announcementsByType", announcementsByType);
    res.status(200).json(announcementsByType);
  } catch (err) {
    next(err);
  }
};

export const getAllAnnouncementsByTypeAndUserId = async (req, res, next) => {
  try {
    const { announcementType, userId } = req.params;
    const { rows: announcementsByTypeAndUserId } = await pool.query(
      `SELECT * FROM announcements WHERE type = $1 AND active = true AND creator_id=$2`,
      [announcementType, userId]
    );
    // console.log("announcementsByTypeAndUserId", announcementType, announcementsByTypeAndUserId);
    res.status(200).json(announcementsByTypeAndUserId);
  } catch (err) {
    next(err);
  }
};

export const getLikedAnnouncementsByTypeAndUserId = async (req, res, next) => {
  try {
    const { announcementType, userId } = req.params;
    const { rows: likedAnnouncementsByTypeAndUserId } = await pool.query(
      `SELECT * FROM favorites, announcements WHERE favorites.active_announcement_id = announcements.id AND announcements.type = $1 AND favorites.announcement_creator_id = $2`,
      [announcementType, userId]
    );
    console.log(
      "likedAnnouncementsByTypeAndUserId",
      likedAnnouncementsByTypeAndUserId
    );
    res.status(200).json(likedAnnouncementsByTypeAndUserId);
  } catch (err) {
    next(err);
  }
};

export const getSingleAnnouncement = async (req, res, next) => {
  try {
    const {
      rows: [announcementsById],
    } = await pool.query(
      `SELECT * FROM announcements WHERE id = $1 AND active = true`,
      [req.params.announcementId]
    );
    console.log("ID", announcementsById);
    res.status(200).json(announcementsById);
  } catch (error) {
    next(err);
  }
};
