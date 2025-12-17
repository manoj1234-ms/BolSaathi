import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const secret = process.env.JWT_SECRET || "supersecretchangeme";
    const payload = jwt.verify(token, secret);

    const user = await User.findById(payload.userId).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token user" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("authRequired error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};


