import multer from "multer";
import path from "path";

// Multer memory storage (store files in memory as buffer)
const storage = multer.memoryStorage();

// Filter uploading image type
const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"));
    }
};

// Upload file size limit: 2MB
const upload = multer({
    storage,                             // Use memory storage
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter,
});

export default upload;