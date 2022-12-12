import pool from "../db/db.js";

export const insertFavorite = async (req, res, next) => {
  // not used by App but for testing purposes in the beginning
  try {
    console.log("Req Body Test", req.body);

    // const {rows: announcements} = await pool.query(`SELECT * FROM announcements WHERE city LIKE $1`,  ['%' + req.body.city + '%']);
    //const {rows: announcements} = await pool.query(`SELECT * FROM announcements`);
    // console.log(pool);
    // res.status(200).json(announcements);
  } catch (err) {
    next(err);
  }
};

export const getFavoriteList = async (req, res, next) => {
  // not used by App but for testing purposes in the beginning
  try {
    const {rows: userFavorites} = await pool.query(`SELECT * FROM favorites WHERE user_id = $1`,  [req.params.userId]);
    console.log("userFavorites", userFavorites);
    res.status(200).json(userFavorites);
  } catch (err) {
    next(err);
  }
};
