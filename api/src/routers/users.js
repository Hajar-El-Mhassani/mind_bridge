import express from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database_client.js";

const usersRouter = express.Router();

// get all users
usersRouter.get("/users", async (_req, res) => {
  try {
    const users = await db("users").select("*");
    res.json(users);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

export default usersRouter;
