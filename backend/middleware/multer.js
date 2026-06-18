import multer from 'multer';

// Use memory storage to store files in buffer before uploading to Cloudinary
const storage = multer.memoryStorage();

// File filter to allow generic file uploads (images, videos, documents, etc.)
const fileFilter = (req, file, cb) => {
  // Allow all files. Specific type restrictions can be configured here if necessary.
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    // 100MB limit for uploading large assets like videos or PDF brochures
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

export default upload;
