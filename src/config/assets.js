/**
 * Frontend Cloudinary Asset Configuration
 * 
 * To avoid storing large files (videos, PDF brochures, high-res images) in the Git repository:
 * 1. Run the migration script in the backend: `node scripts/uploadExistingAssets.js`
 * 2. It will generate `backend/cloudinary_mapping.json` with the exact URLs.
 * 3. Copy the URLs from that file and paste them into the `assetUrls` map below.
 * 
 * If the URL is not found in `assetUrls`, it automatically falls back to the local `src/assets/` folder.
 */

// Centralized asset mapping
export const assetUrls = {
  // --- Large Video Assets ---
  'Thread_Logo.mp4': '',
  'ThreadLogo.mp4': '',
  'floatingline-HOF.webm': 'https://res.cloudinary.com/df8tewbwi/video/upload/v1781791067/thread_security_assets/floatingline-HOF_1781790940670.mkv',
  'methodlogy-pixel.webm': '',

  // --- PDF & Document Assets ---
  'Roadmap.pdf': '',
  'ThreadSecurity-Brochure (2).pdf': '',

  // --- High-Res Images & Logos ---
  'Thread_Security_Logo-1--01 (1).png': '',
  'CEO.jpeg': 'https://res.cloudinary.com/df8tewbwi/image/upload/v1781790924/thread_security_assets/CEO_1781790909250.jpg',
  'CTO.jpeg': 'https://res.cloudinary.com/df8tewbwi/image/upload/v1781790937/thread_security_assets/CTO_1781790924392.jpg',
  'Roadmap.jpeg': 'https://res.cloudinary.com/df8tewbwi/image/upload/v1781791201/thread_security_assets/Roadmap_1781791165920.jpg',
  'Roadmap2.jpeg': '',
  'Favicon1.png': 'https://res.cloudinary.com/df8tewbwi/image/upload/v1781790939/thread_security_assets/Favicon1_1781790937764.png',
  'Favicon2.png': 'https://res.cloudinary.com/df8tewbwi/image/upload/v1781790940/thread_security_assets/Favicon2_1781790939439.png',
  'hackviet__hackathon2026__techfest__codinglife__co.jpg.jpeg': 'https://res.cloudinary.com/df8tewbwi/image/upload/v1781791071/thread_security_assets/hackviet__hackathon2026__techfest__codinglife__co_jpg_1781791070205.jpg',
  'threadsecurity__cybersecurity__blockchain__hackat.jpg.jpeg': '',
};

/**
 * Returns the Cloudinary URL for a given file name.
 * Falls back to the local development path if the Cloudinary URL is not configured.
 * 
 * @param {string} filename - The exact name of the file (e.g. 'Thread_Logo.mp4')
 * @returns {string} The resolved URL (Cloudinary URL or local asset path)
 */
export const getAssetUrl = (filename) => {
  // If the Cloudinary URL is set in the mapping, use it
  if (assetUrls[filename]) {
    return assetUrls[filename];
  }

  // Fallback: Resolve path to local asset
  // Vite handles dynamic imports / public pathing
  return new URL(`../assets/${filename}`, import.meta.url).href;
};
