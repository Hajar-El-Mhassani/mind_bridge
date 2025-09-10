import express from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database_client.js";

const usersRouter = express.Router();

// get all users
usersRouter.get("/users", async (_req, res) => {
  try {
    const users = await db("users").select(
      "id",
      "name",
      "email",
      "image",
      "password",
      "date_birth",
      "created_at",
      "updated_at"
    );
    // serve user image with full url
    const baseUrl = `${_req.protocol}://${_req.get("host")}`;
    const formattedUsers = users.map((user) => {
      return {
        ...user,
        image: user.image ? `${baseUrl}${user.image}` : null,
      };
    });
    res.json(formattedUsers);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

export default usersRouter;
