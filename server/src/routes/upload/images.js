import express from "express";
const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    // config s3 bucket
    // get the files from client
    // check the validation of files and the sizes of files
    // upload the file to s3 bucket and inject the userId with it and the section name
    // Example: key:images/userId/project-projectID/...  || images/userId/experiences-expID/...
    // get the img url and update it in database
  } catch (error) {}
});

export default router;
