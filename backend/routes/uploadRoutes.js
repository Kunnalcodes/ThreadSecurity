import express from 'express';
import upload from '../middleware/multer.js';
import { uploadFile, deleteFile } from '../controllers/uploadController.js';

const router = express.Router();

// Route to handle single file upload
// Expects form-data field name 'file'
router.post('/', upload.single('file'), uploadFile);

// Route to handle deleting files from Cloudinary
router.delete('/delete', deleteFile);

export default router;
