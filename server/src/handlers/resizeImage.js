import sharp from "sharp";

export default async function resizedImage(buffer, width, height, quality) {
  const resizedImage = await sharp(buffer)
    .resize(width, height, { withoutEnlargement: true, fit: "cover" })
    .toFormat("webp")
    .webp({ quality })
    .toBuffer();
  return resizedImage;
}

//https://presento-app.s3.amazonaws

//kp_97e8bf7e580744ed8c8af94843871643/skills/1725289432508-icons8-docker-240.png
