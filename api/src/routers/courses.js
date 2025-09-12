import express from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database_client.js";
import { validateBody } from "../middlewares/validateCourse.js";
import { courseSchema, partialCourseSchema } from "../schemas/courseSchema.js";
import { upload } from "../middlewares/multer.js";
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
      "duration",
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
coursesRouter.post(
  "/add-course",
  upload.single("thumbnail"), // handle file upload
  validateBody(courseSchema), // validate request body with Zod
  async (req, res) => {
    console.log("Validated data:", req.validatedBody);

    try {
      const data = { ...req.validatedBody };

      //  Check if user exists
      const user = await db("users").where({ id: data.created_by }).first();
      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid created_by: user not found" });
      }

      // Add uploaded image if present
      //Handle image
      if (req.file) {
        data.image = `/uploads/courses/${req.file.filename}`;
      } else {
        data.image = "/uploads/courses/default-course.png"; // default image
      }

      // Insert course
      const [course] = await db("courses").insert(data).returning("*");

      res.status(201).json({ message: "Course created successfully", course });
    } catch (err) {
      console.error("Error creating course:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default coursesRouter;
