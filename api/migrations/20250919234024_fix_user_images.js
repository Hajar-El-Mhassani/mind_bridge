// migrations/20250918_fix_user_images.js

export async function up(knex) {
  // Update any old /uploads/... paths to use Cloudinary default avatar
  await knex("users").where("image", "like", "/uploads/users/%").update({
    image:
      "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg",
  });
}

export async function down(knex) {}
