/**
 * Use multer to receive uploaded images,
 * use sharp to process uploaded image files, reduce the size, convert to webp format,
 * then save to aws s3.
 * */
const multer = require("multer");
const sharp = require("sharp");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const axios = require("axios");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

const processImage = async (req, res, next) => {
  if (!req.file) return next();
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 300,
        height: 300,
        fit: sharp.fit.cover,
      })
      .webp({ quality: 50 })
      .toBuffer();
    const imageName = uuidv4() + ".webp";

    const signedUrlExpireSeconds = 60 * 5;
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: imageName,
      ContentType: "image/webp",
    });
    const url = await getSignedUrl(s3, command, {
      expiresIn: signedUrlExpireSeconds,
    });
    await axios.put(url, buffer);
    req.file.filename = imageName;
    next();
  } catch (err) {
    res.status(401).json({ message: `AWS error: ${err}` });
  }
};

const saveImage = [upload.single("image"), processImage];
module.exports = saveImage;
