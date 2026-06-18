/**
 * Cloudinary API Frontend Service
 * 
 * Interacts with the backend upload/delete endpoints.
 */

const API_BASE_URL = 'http://localhost:5000/api/upload';

/**
 * Uploads a file to Cloudinary via the Express backend
 * 
 * @param {File} file - The file object from <input type="file" />
 * @param {function} onProgress - Optional callback for upload progress
 * @returns {Promise<object>} The server response containing the secure URL and public ID
 */
export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload file.');
    }

    return data; // contains url, public_id, resource_type, etc.
  } catch (error) {
    console.error('Upload error in service:', error);
    throw error;
  }
};

/**
 * Deletes a file from Cloudinary via the Express backend
 * 
 * @param {string} publicId - The Cloudinary public ID (e.g. 'thread_security_assets/CEO_1234567')
 * @param {string} resourceType - The resource type ('image', 'video', or 'raw')
 * @returns {Promise<object>} The server deletion response
 */
export const deleteFile = async (publicId, resourceType = 'image') => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_id: publicId,
        resource_type: resourceType,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete file.');
    }

    return data;
  } catch (error) {
    console.error('Delete error in service:', error);
    throw error;
  }
};
