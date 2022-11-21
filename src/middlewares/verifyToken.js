import jwt from "jsonwebtoken";

// MIDDLEWARE FOR TOKEN AUTH
const verifyToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    console.log("authorization", authorization);
    if (!authorization) throw new Error("Please login");
    const { id } = jwt.verify(authorization, process.env.JWT_SECRET);
    req.userId = id;
    console.log("_id", id);
    next();
  } catch (err) {
    res.send(err.message);
  }
};

export default verifyToken;