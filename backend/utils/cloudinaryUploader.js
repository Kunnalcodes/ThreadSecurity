import cloudinary from '../config/cloudinary.js';

/**
 * Uploads a file buffer to Cloudinary using stream upload
 * @param {Buffer} fileBuffer - The file buffer from multer
 * @param {string} originalName - Original filename
 * @param {string} mimeType - The mime type of the file
 * @returns {Promise<object>} Cloudinary upload result object
 */
export const uploadToCloudinary = (fileBuffer, originalName, mimeType) => {
  return new Promise((resolve, reject) => {
    // Determine the resource type based on mimeType
    let resourceType = 'auto';
    if (mimeType.startsWith('image/')) {
      resourceType = 'image';
    } else if (mimeType.startsWith('video/')) {
      resourceType = 'video';
    } else {
      // For raw files like PDF, zip, docx, etc.
      resourceType = 'raw';
    }

    // Clean name for public ID (remove extension, replace special chars)
    const cleanName = originalName
      .substring(0, originalName.lastIndexOf('.'))
      .replace(/[^a-zA-Z0-9-_]/g, '_');

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'thread_security_assets',
        resource_type: resourceType,
        public_id: `${cleanName}_${Date.now()}`,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};
