import pool from "../db/db.js";

export const insertFavorite = async (req, res, next) => {
  // not used by App but for testing purposes in the beginning
  const favoriteData = req.body;
  try {
    console.log("Req Body Test", req.body);
    const createdFavorite = await pool.query(
      "INSERT INTO favorites (user_id, announcement_id, type, text) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        favoriteData.user_id,
        favoriteData.announcement_id,
        favoriteData.type,
        favoriteData.text,
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
