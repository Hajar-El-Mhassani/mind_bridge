import fs from "fs";
import path from "path";
import cloudinary from "../../cloudinary.js"; // Cloudinary config file
import knex from "../database_client.js"; // knex instance

const uploadDir = path.join(process.cwd(), "uploads/courses");

async function migrateImages() {
  try {
    const courses = await knex("courses").select("id", "image");

    for (const course of courses) {
      if (course.image && course.image.startsWith("/uploads/courses/")) {
        const fileName = path.basename(course.image);
        const filePath = path.join(uploadDir, fileName);

        if (fs.existsSync(filePath)) {
          console.log(`Uploading ${fileName}...`);

          const result = await cloudinary.uploader.upload(filePath, {
            folder: "courses", // Cloudinary folder
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          });

          console.log(`✔ Uploaded: ${result.secure_url}`);

          // Update DB with the new Cloudinary URL
          await knex("courses")
            .where({ id: course.id })
            .update({ image: result.secure_url });
        } else {
          console.warn(`File not found: ${filePath}`);
        }
      }
    }

    console.log("Migration finished!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrateImages();
