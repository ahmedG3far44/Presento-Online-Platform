import express from "express";
import Exceptions from "../../handlers/Exceptions.js";
const router = express.Router();

router.post("/:userId/upload", async (req, res) => {
  const { userId } = req.params;
  const file = req.file;
  const payload = req.body;
  try {
    console.log(userId);
    console.log(file);
    // config s3 bucket
    // get the files from client
    // check the validation of files and the sizes of files
    // upload the file to s3 bucket and inject the userId with it and the section name
    // Example: key:images/userId/project-projectID/...  || images/userId/experiences-expID/...
    // get the img url and update it in database
    return res.status(200).json(payload, userId);
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

export default router;
