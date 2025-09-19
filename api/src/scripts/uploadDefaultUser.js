import cloudinary from "../../cloudinary.js"; // your config

const uploadDefaultAvatar = async () => {
  try {
    const result = await cloudinary.uploader.upload(
      "./uploads/users/default.jpg",
      {
        folder: "users", // auto-creates /users folder
        public_id: "default", // filename = users/default.jpg
        overwrite: true,
      }
    );

    console.log(" Default avatar uploaded:", result.secure_url);
  } catch (err) {
    console.error("❌ Upload failed:", err);
  }
};

uploadDefaultAvatar();

export default uploadDefaultAvatar;
