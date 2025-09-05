import express from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database_client.js";

const coursesRouter = express.Router();

// get all courses
coursesRouter.get("/courses", async (_req, res) => {
  try {
    const courses = await db("courses").select("*");
    res.json(courses);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

export default coursesRouter;
