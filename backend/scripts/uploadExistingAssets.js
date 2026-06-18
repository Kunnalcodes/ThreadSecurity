import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, '../../src/assets');
const MAPPING_FILE = path.resolve(__dirname, '../cloudinary_mapping.json');

// Check if Cloudinary is configured
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name' ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error('\nError: Cloudinary credentials are not set or are using default placeholders in backend/.env.');
  console.error('Please configure your CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET first.\n');
  process.exit(1);
}

async function uploadFile(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  
  let resourceType = 'auto';
  if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
    resourceType = 'image';
  } else if (['.mp4', '.webm', '.ogg', '.mov'].includes(ext)) {
    resourceType = 'video';
  } else {
    // raw for PDFs and other files
    resourceType = 'raw';
  }

  console.log(`Uploading ${fileName} (${resourceType})...`);
  
  try {
    const cleanName = path.parse(fileName).name.replace(/[^a-zA-Z0-9-_]/g, '_');
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'thread_security_assets',
      resource_type: resourceType,
      public_id: `${cleanName}_${Date.now()}`,
    });
    console.log(`Successfully uploaded ${fileName} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`Failed to upload ${fileName}:`, error.message);
    return null;
  }
}

async function run() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`Assets directory not found at: ${ASSETS_DIR}`);
    return;
  }

  const files = fs.readdirSync(ASSETS_DIR);
  const mapping = {};

  console.log(`Found ${files.length} assets to process in ${ASSETS_DIR}.`);

  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    const stat = fs.statSync(filePath);
    
    // Skip directories
    if (stat.isDirectory()) continue;

    // Skip small boilerplate assets like react.svg if needed, but let's let them upload
    if (file === 'react.svg') continue;

    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    console.log(`\nProcessing ${file} (${sizeMB} MB)`);
    
    const url = await uploadFile(filePath);
    if (url) {
      mapping[file] = url;
    }
  }

  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  console.log(`\nUpload complete!`);
  console.log(`Mapping saved to: ${MAPPING_FILE}`);
  console.log(`You can use the Cloudinary URLs in this mapping file to replace local files.`);
}

run();
