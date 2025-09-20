import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "users", // all profile images go here
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: (req, file) =>
      `user-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  },
});

export const uploadUserImage = multer({ storage }).single("image");
