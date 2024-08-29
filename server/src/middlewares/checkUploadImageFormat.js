export default function checkUploadImageFormat(req, res, next) {
  const image = req.file;

  // console.log(payload);
  console.log(image);

  if (!image) {
    return res.status(400).json({
      error: "not found error",
      message: "error not found image",
    });
  }

  if (image.size >= 4194304) {
    return res.status(400).json({
      error: "large size error",
      message: "Image size size to large upload img less than 4MB.",
    });
  }
  const fileTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!fileTypes.includes(image.mimetype)) {
    return res.status(400).json({
      error: "file type error",
      message: "the image file should be in this formats: JPEG, JPG, PNG.",
    });
  }

  return next();
}
