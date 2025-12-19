import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // __dirname ka use karke path fix karein
    const uploadPath = path.resolve("public", "temp");

    // Agar folder nahi hai, toh use create karein (Crash prevention)
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Unique filename dena better hai taki same name ki images overwrite na ho
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname.replace(/\s+/g, '_'));
  },
});

export const upload = multer({
  storage,
});