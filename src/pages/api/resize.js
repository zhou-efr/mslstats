export default async function handler(req, res) {
    const { width, height } = req.query;
    let { url, imageUrl } = req.query;

    if (imageUrl && !url) {
        url = imageUrl;
    }
    
    if (width && height && url) {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const sharp = require("sharp");
        const resized = await sharp(buffer)
        .resize(parseInt(width), parseInt(height))
        .toBuffer();
        res.setHeader("Content-Type", `image/jpg`);
        res.setHeader("Cache-Control", `public, max-age=31536000, immutable`);
        res.end(resized);
    } else {
        res.statusCode = 400;
        res.end("Bad Request");
    }
}
