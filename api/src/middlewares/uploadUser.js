import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../../cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "users", //all user images stored in /users
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: `user-${Date.now()}`, // unique name
  },
});

export const uploadUserImage = multer({ storage }).single("image");
