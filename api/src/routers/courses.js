import express from "express";
import { StatusCodes } from "http-status-codes";
import knex from "../database_client.js";
/* import { validateBody } from "../middlewares/validateCourse.js";
import { courseSchema, partialCourseSchema } from "../schemas/courseSchema.js";
 */ import { upload } from "../middlewares/multer.js";
const coursesRouter = express.Router();

// get all courses
coursesRouter.get("/courses", async (req, res) => {
  try {
    let query = knex("courses").select(
      "courses.id",
      "title",
      "description",
      "courses.image",
      "price",
      "level",
      "status",
      "category",
      "duration",
      "created_by",
      "courses.created_at",
      "courses.updated_at"
    );

    const search = req.query.search;
    if (typeof search === "string") {
      if (search.length > 0) {
        query = query.where((qb) => {
          qb.where("title", "ilike", `%${search}%`).orWhere(
            "description",
            "ilike",
            `%${search}%`
          );
        });
      }
    }

    const category = req.query.category;
    if (typeof category === "string") {
      if (category.length > 0 && category !== "All") {
        query = query.where("category", "=", `${category}`);
      }
    }

    const level = req.query.level;
    if (typeof level === "string") {
      if (level.length > 0 && level !== "All") {
        query = query.where("level", "=", `${level}`);
      }
    }

    const createdBy = req.query.created_by;
    if (createdBy) {
      if (!isNaN(createdBy) && createdBy > 0) {
        query = query.where("created_by", "=", `${createdBy}`);
      }
    }

    const price = req.query.price;
    if (typeof price === "string") {
      if (price.length > 0 && price !== "All") {
        switch (price) {
          case "free":
            query = query.where("price", "=", 0);
            break;
          case "paid":
            query = query.where("price", ">", 0);
            break;
        }
      }
    }

    const sort = req.query.sort;
    if (typeof sort === "string") {
      if (sort.length > 0) {
        switch (sort) {
          case "newest":
            query = query.orderBy("created_at", "desc");
            break;
          case "lowest-price":
            query = query.orderBy("price", "asc");
            break;
          case "highest-price":
            query = query.orderBy("price", "desc");
            break;
        }
      }
    } else {
      query = query.orderBy("created_at", "desc");
    }

    const courses = await query;

    // serve course image with full url
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formattedCourses = courses.map((course) => ({
      ...course,
      image: course.image ? `${baseUrl}${course.image}` : null,
    }));

    res.json(formattedCourses);
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

//  Fetch the list of authors to use in UI when filtering courses by author name
coursesRouter.get("/course-authors", async (req, res) => {
  try {
    let query = knex("courses")
      .distinct()
      .select(
        "created_by",
        "users.name as creator_name" // get user name
      )
      .leftJoin("users", "courses.created_by", "users.id")
      .orderBy("creator_name");

    const creators = await query;
    res.json(creators);
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

//GET all courses created by logged-in user
coursesRouter.get("/my-courses", async (req, res) => {
  try {
    let query = knex("courses").select(
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

    const search = req.query.search;
    if (typeof search === "string") {
      if (search.length > 0) {
        query = query.where((qb) => {
          qb.where("title", "ilike", `%${search}%`).orWhere(
            "description",
            "ilike",
            `%${search}%`
          );
        });
      }
    }

    const category = req.query.category;
    if (typeof category === "string") {
      if (category.length > 0 && category !== "All") {
        query = query.where("category", "=", `${category}`);
      }
    }

    query = query.where("created_by", 1);
    console.log(query.toSQL());
    const courses = await query;

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

coursesRouter.get("/my-courses/:id", async (req, res) => {
  try {
    let query = knex("courses").select(
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
    )
        .where("id", req.params.id)
        .first();

    console.log(query.toSQL());
    const course = await query;

    // serve course image with full url
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    course.image = course.image ? `${baseUrl}${course.image}` : null;

    res.json(course);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

coursesRouter.post(
  "/add-course",
  upload.single("thumbnail"), // handle file upload
  /*   validateBody(courseSchema), // validate request body with Zod
   */ async (req, res) => {
    console.log(
      "Request body:",
      req.body /* "Validated data:" */ /* req.validatedBody */
    );

    try {
      const data = { ...req.body /* req.validatedBody */ };

      //  Check if user exists
      const user = await knex("users").where({ id: data.created_by }).first();
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
      const [course] = await knex("courses").insert(data).returning("*");

      res.status(201).json({ message: "Course created successfully", course });
    } catch (err) {
      console.error("Error creating course:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

coursesRouter.post(
  "/my-courses/:id",
  upload.single("thumbnail"), // handle file upload
  async (req, res) => {
    console.log(
      "Request body:",
      req.body
    );

    const id = req.params.id;
    try {
      const data = { ...req.body };

      //  Check if user exists
      const user = await knex("users").where({ id: id }).first();
      if (!user || id !== data.created_by) {
        return res
          .status(400)
          .json({ error: "Invalid created_by: user not found" });
      }

      if (req.file) {
        data.image = `/uploads/courses/${req.file.filename}`;
      } else {
        data.image = "/uploads/courses/default-course.png"; // default image
      }

      // Insert course
      await knex("courses").where("id", id).update(data);

      res.status(201).json({ message: "Course updated successfully"});
    } catch (err) {
      console.error("Error creating course:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

coursesRouter.delete("/my-courses/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (id && !isNaN(id) && id > 0) {
      await knex("courses").where({ id: id }).delete();
      res.status(StatusCodes.OK).send("success");
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid id value" });
    }
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

export default coursesRouter;
