import pool from "../db/db.js";

export const insertFavorite = async (req, res, next) => {
  // not used by App but for testing purposes in the beginning
  const favoriteData = req.body;
  try {
    console.log("Req Body Test", req.body);
    const createdFavorite = await pool.query(
      "INSERT INTO favorites (user_id, active_announcement_id, announcement_id, type, text, announcement_creator_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        favoriteData.user_id,
        favoriteData.active_announcement_id,
        favoriteData.announcement_id,
        favoriteData.type,
        favoriteData.text,
        favoriteData.announcement_creator_id,
      ]
    );
    console.log("createdFavorite", createdFavorite.rows);
    res.status(201).json(createdFavorite.rows);
  } catch (err) {
    next(err);
  }
};

export const getFavoriteList = async (req, res, next) => {
  // not used by App but for testing purposes in the beginning
  try {
    const { rows: userFavorites } = await pool.query(
      `SELECT * FROM favorites WHERE user_id = $1`,
      [req.params.userId]
    );
    console.log("userFavorites", userFavorites);
    res.status(200).json(userFavorites);
  } catch (err) {
    next(err);
  }
};

export const deleteFavorite = async (req, res, next) => {
  // not used by App but for testing purposes in the beginning
  const { favoriteId } = req.params;
  console.log("Delete", favoriteId);
  try {
    const deletedFavorite = await pool.query(
      "DELETE FROM favorites WHERE id=$1 RETURNING *;",
      [favoriteId]
    );
    console.log("deletedFavorite", deletedFavorite.rows);
    res.status(201).json(deletedFavorite.rows);
  } catch (err) {
    next(err);
  }
};
export const changeFavoriteText = async (req, res, next) => {
  const { favoriteId } = req.params;
  const favoriteData = req.body;
  console.log("Change", favoriteId);
  try {
    const changedFavoriteText = await pool.query(
      "UPDATE favorites SET text=$1 WHERE id=$2 RETURNING *;",
      [favoriteData.text, favoriteId]
    );
    console.log("changedFavoriteText", changedFavoriteText.rows);
    res.status(201).json(changedFavoriteText.rows);
  } catch (err) {
    next(err);
  }
};

export const getMatchesList = async (req, res, next) => {
  // not used by App but for testing purposes in the beginning
  // console.log("getMatchesList!!", req.params);
  try {
    const { rows: userMatches } = await pool.query(
      `SELECT 
      *
  FROM 
      favorites AS tab1
  WHERE user_id = $1 AND
      EXISTS( SELECT 
                  1 
              FROM 
                  favorites AS tab2
              WHERE 
                  tab2.announcement_id = tab1.active_announcement_id)`,
      [req.params.userId]
    );
    // console.log("userMatches", userMatches);

    const announcementIds = [];
    const returnResult = [];
    let firstAnnouncement,
      secondAnnouncement,
      offerAnnouncement,
      requestAnnouncement;
    userMatches.forEach((userMatch) =>
      announcementIds.push(
        userMatch.announcement_id,
        userMatch.active_announcement_id
      )
    );
    // console.log("announcementIds", announcementIds);

    const { rows: matchAnnouncements } = await pool.query(
      `SELECT * FROM announcements WHERE id IN (${announcementIds.toString()})`
    );
    console.log("matchAnnouncements", matchAnnouncements);
    userMatches.forEach((userMatch) => {
      firstAnnouncement = matchAnnouncements.find(
        (matchAnnouncement) =>
          matchAnnouncement.id === userMatch.announcement_id
      );
      secondAnnouncement = matchAnnouncements.find(
        (matchAnnouncement) =>
          matchAnnouncement.id === userMatch.active_announcement_id
      );
      offerAnnouncement =
        firstAnnouncement.type === "angebot"
          ? firstAnnouncement
          : secondAnnouncement;
      requestAnnouncement =
        firstAnnouncement.type === "gesuch"
          ? firstAnnouncement
          : secondAnnouncement;
      returnResult.push({
        offer_id: offerAnnouncement.id,
        offer_image: offerAnnouncement.images,
        offer_title: offerAnnouncement.title,
        offer_creator_id: offerAnnouncement.creator_id,
        request_id: requestAnnouncement.id,
        request_image: requestAnnouncement.images,
        request_title: requestAnnouncement.title,
        request_creator_id: requestAnnouncement.creator_id,
      });
    });
    console.log("returnResult", returnResult);
    res.status(200).json(returnResult);
  } catch (err) {
    next(err);
  }
};
