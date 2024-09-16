export default function checkUploadImageFormat(req, res, next) {
  const fileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  if (!req.files) {
    const image = req.file;
    if (!image) {
      return res.status(400).json({
        error: "not found error",
        message: "error not found image",
      });
    }

    if (image.size >= 4194304) {
      console.log("thumbnail image check not accepted");

      return res.status(400).json({
        error: "large size error",
        message: "Image size size to large upload img less than 4MB.",
      });
    }
    if (!fileTypes.includes(image.mimetype)) {
      return res.status(400).json({
        error: "file type error",
        message: "the image file should be in this formats: JPEG, JPG, PNG.",
      });
    }
    return next();
  } else {
    const images = req.files;
    images.map((image, index) => {
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

      if (!fileTypes.includes(image.mimetype)) {
        return res.status(400).json({
          error: "file type error",
          message: "the image file should be in this formats: JPEG, JPG, PNG.",
        });
      }
      console.log(`${index} image check accepted`);
    });
  }
  return next();
}
