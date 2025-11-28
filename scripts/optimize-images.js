const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

// Configuration
const MAX_WIDTH = 1920;
const QUALITY = 80;

const processFile = async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

    const dir = path.dirname(filePath);
    const name = path.basename(filePath, ext);
    const newPath = path.join(dir, `${name}.webp`);

    try {
        const metadata = await sharp(filePath).metadata();

        // Skip if already small enough
        if (metadata.width <= MAX_WIDTH && ext === '.webp') return;

        console.log(`Optimizing: ${path.relative(publicDir, filePath)}`);

        let pipeline = sharp(filePath);

        // Resize if too large
        if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH);
        }

        // Convert to WebP
        await pipeline
            .webp({ quality: QUALITY })
            .toFile(newPath);

        console.log(`✓ Created: ${path.relative(publicDir, newPath)}`);

        // Optional: Delete original if you want to replace fully
        // fs.unlinkSync(filePath); 
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }
};

const walkDir = async (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            await walkDir(filePath);
        } else {
            await processFile(filePath);
        }
    }
};

(async () => {
    console.log('Starting image optimization...');
    try {
        await processFile(path.join(publicDir, 'loaderLogo.png')); // Specific critical file
        await walkDir(imagesDir);
        console.log('Image optimization complete!');
    } catch (err) {
        console.error('Optimization failed:', err);
    }
})();
