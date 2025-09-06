import express from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database_client.js";

const coursesRouter = express.Router();

// get all courses
coursesRouter.get("/courses", async (req, res) => {
  try {
    const courses = await db("courses").select(
      "id",
      "title",
      "description",
      "image",
      "price",
      "level",
      "status",
      "category",
      "enrolled",
      "created_by",
      "created_at",
      "updated_at"
    );
    // serve course image with full url
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formattedCourses = courses.map((course) => ({
      ...course,
      image: course.image ? `${baseUrl}${course.image}` : null,
    }));

    res.json(formattedCourses);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

export default coursesRouter;
