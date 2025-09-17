import { StatusCodes } from "http-status-codes";
import { verifyToken, extractTokenFromHeader } from "../utils/jwt.js";
import db from "../database_client.js";

export const authenticateToken = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Access token required",
      });
    }

    const decoded = verifyToken(token);

    const user = await db("users").where("id", decoded.userId).first();

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "User not found",
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Invalid or expired token",
    });
  }
};
