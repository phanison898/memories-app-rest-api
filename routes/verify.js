import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(404).json("ACCESS DENIED");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified._id;
    next();
  } catch (error) {
    res.status(404).json("Invalid request");
  }
}
