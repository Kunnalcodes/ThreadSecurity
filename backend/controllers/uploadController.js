import { uploadToCloudinary } from '../utils/cloudinaryUploader.js';
import cloudinary from '../config/cloudinary.js';

/**
 * Controller to upload files to Cloudinary
 * Endpoint: POST /api/upload
 */
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please upload a file with the key "file".',
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes,
      resource_type: result.resource_type,
    });
  } catch (error) {
    console.error('Cloudinary upload controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file to Cloudinary',
      error: error.message,
    });
  }
};

/**
 * Controller to delete files from Cloudinary
 * Endpoint: DELETE /api/upload
 */
export const deleteFile = async (req, res) => {
  try {
    const public_id = req.body.public_id || req.query.public_id;
    const resource_type = req.body.resource_type || req.query.resource_type || 'image';

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameter: public_id must be provided in request body or query parameters.',
      });
    }

    // Call Cloudinary destroy API
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: resource_type,
    });

    if (result.result === 'ok') {
      return res.status(200).json({
        success: true,
        message: 'File deleted successfully from Cloudinary',
        result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Cloudinary deletion returned: ${result.result}. Verify the public_id and resource_type are correct.`,
        result,
      });
    }
  } catch (error) {
    console.error('Cloudinary delete controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file from Cloudinary',
      error: error.message,
    });
  }
};
