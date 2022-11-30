import pool from "../db/db.js";

export const InsertFavorite = async (req, res, next) => {
  // not used by App but for testing purposes in the beginning
  try {
    console.log(req.body);
    // const {rows: announcements} = await pool.query(`SELECT * FROM announcements WHERE city LIKE $1`,  ['%' + req.body.city + '%']);
    //const {rows: announcements} = await pool.query(`SELECT * FROM announcements`);
    // console.log(pool);
    res.status(200).json(announcements);
  } catch (err) {
    next(err);
  }
};
