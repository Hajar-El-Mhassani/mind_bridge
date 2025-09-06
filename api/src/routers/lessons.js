import express from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database_client.js";

const lessonsRouter = express.Router();

// get all lessons
lessonsRouter.get("/lessons", async (_req, res) => {
  try {
    const lessons = await db("lessons").select("*");
    res.json(lessons);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

export default lessonsRouter;
