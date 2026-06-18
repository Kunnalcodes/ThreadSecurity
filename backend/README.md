# Thread Security Backend (Cloudinary File Setup)

This backend service provides an endpoint to upload static files (images, videos, PDFs) to Cloudinary and return their secure URLs. It also includes an automation script to upload all your existing local files under `src/assets` to Cloudinary.

## Prerequisites

1. Node.js (v16+ recommended)
2. A Cloudinary account (Sign up for free at [cloudinary.com](https://cloudinary.com))

---

## Getting Started

### 1. Setup Environment Variables

Copy `.env.example` to `.env` in the `backend/` directory:

```bash
cp .env.example .env
```

Open `.env` and fill in your Cloudinary credentials:

```env
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 2. Install Dependencies

Install the backend node modules:

```bash
cd backend
npm install
```

### 3. Run the Backend Server

Start the server in development mode (with hot reloading via `nodemon`):

```bash
npm run dev
```

For production mode:

```bash
npm start
```

Your server will run at `http://localhost:5000`. You can test it by going to `http://localhost:5000/health`.

---

## File Upload API

### 1. Upload File

- **URL:** `/api/upload`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Body Parameter:** `file` (the binary file to upload)

**Example Request (JavaScript fetch):**

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:5000/api/upload', {
  method: 'POST',
  body: formData,
});
const data = await response.json();
console.log(data.url); // The Cloudinary URL of the uploaded file
```

**Response Format:**

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "url": "https://res.cloudinary.com/your-cloud-name/image/upload/v12345678/thread_security_assets/CEO_1234567.jpg",
  "public_id": "thread_security_assets/CEO_1234567",
  "format": "jpg",
  "bytes": 1212005,
  "resource_type": "image"
}
```

### 2. Delete File

- **URL:** `/api/upload`
- **Method:** `DELETE`
- **Content-Type:** `application/json`

**Body Parameters:**
- `public_id` (string, required): The Cloudinary public ID returned when uploading the file (e.g. `thread_security_assets/CEO_1234567`).
- `resource_type` (string, optional): One of `'image'`, `'video'`, or `'raw'`. Defaults to `'image'`.

**Example Request (JavaScript fetch):**

```javascript
const response = await fetch('http://localhost:5000/api/upload', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    public_id: 'thread_security_assets/CEO_1234567',
    resource_type: 'image'
  }),
});
const data = await response.json();
console.log(data.message); // "File deleted successfully from Cloudinary"
```

**Response Format:**

```json
{
  "success": true,
  "message": "File deleted successfully from Cloudinary",
  "result": {
    "result": "ok"
  }
}
```

---

## Migrating Existing Assets to Cloudinary

If you have large files in the frontend `src/assets` directory (like `Thread_Logo.mp4`, `ThreadSecurity-Brochure (2).pdf`, webm files, etc.) that exceed GitHub size limits or are slow to load, you can automatically upload them to Cloudinary.

1. Ensure your `.env` file is fully configured with valid Cloudinary credentials.
2. Run the migration script:

```bash
cd backend
node scripts/uploadExistingAssets.js
```

3. The script will:
   - Scan all files inside `src/assets`
   - Upload them to your Cloudinary account under the `thread_security_assets` folder
   - Generate a `cloudinary_mapping.json` file inside the `backend/` directory.

### Example `cloudinary_mapping.json`:

```json
{
  "CEO.jpeg": "https://res.cloudinary.com/...",
  "Thread_Logo.mp4": "https://res.cloudinary.com/...",
  "ThreadSecurity-Brochure (2).pdf": "https://res.cloudinary.com/..."
}
```

You can use these URLs in your frontend React components to replace local imports. Once replaced, you can delete the large files from `src/assets` so they do not get tracked by Git.
