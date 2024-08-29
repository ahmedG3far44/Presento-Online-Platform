import express from "express";
import prisma from "../database/db.js";
import Exceptions from "../handlers/Exceptions.js";
import checkAccessUser from "../middlewares/checkAccessUser.js";
import checkUploadImageFormat from "../middlewares/checkUploadImageFormat.js";
import s3Client from "../s3/s3Client.js";
import { experienceSchema } from "../schemas/validationSchemas.js";
import { changeToSlug, upload } from "./skills.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const router = express.Router();

router.get("/:userId/experiences", async (req, res) => {
  try {
    const { userId } = req.params;
    const experiencesList = await prisma.experiences.findMany({
      where: {
        usersId: userId,
      },
    });
    if (!experiencesList) {
      return res.status(200).json({ experiencesList: "not items found" });
    }
    return res.status(200).json(experiencesList);
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

router.post(
  "/:userId/experiences",
  upload.single("file"),
  checkUploadImageFormat,
  async (req, res) => {
    try {
      let uploadImgPath;
      const { userId } = req.params;
      const payload = req.body;
      const image = req.file;
      console.log(image);
      console.log(payload);
      const validExperiencePayload = experienceSchema.safeParse(payload);
      if (!validExperiencePayload.success) {
        return res
          .status(400)
          .json(
            new Exceptions(
              400,
              validExperiencePayload.error.formErrors.fieldErrors
            )
          );
      } else {
        uploadImgPath = `${userId}/experiences/${Date.now()}-${changeToSlug(
          image.originalname
        )}`;
        // upload img to s3
        const command = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: uploadImgPath,
          Body: image.buffer,
        });
        await s3Client
          .send(command)
          .then(() => {
            console.log("upload company logo success");
          })
          .catch((error) => {
            console.log("upload error");
            res.status(500).json({
              error: "not upload error",
              message: error.message,
            });
          });
        // add img url to  new exp
        // create new exp
        await prisma.experiences.create({
          data: {
            ...validExperiencePayload.data,
            cLogo: `https://presento-app.s3.amazonaws.com/${uploadImgPath}`,
            usersId: userId,
          },
        });
        console.log("created experience in db");
        return res
          .status(201)
          .json(new Exceptions(201, "a new experiences was added."));
      }
    } catch (error) {
      return res.status(500).json(new Exceptions(500, error.message));
    }
  }
);
router.put("/:userId/experiences/:id", checkAccessUser, async (req, res) => {
  try {
    const { userId, id } = req.params;
    const payload = req.body;
    const validExperiencePayload = experienceSchema.safeParse(payload);
    if (!validExperiencePayload.success) {
      return res
        .status(400)
        .json(new Exceptions(400, "Bad request not a valid data."));
    } else {
      await prisma.experiences.update({
        where: {
          id,
          usersId: userId,
        },
        data: { ...validExperiencePayload.data, usersId: userId },
      });
      return res
        .status(200)
        .json(
          new Exceptions(200, "experience information was updated successfully")
        );
    }
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});
router.delete("/:userId/experiences/:id", checkAccessUser, async (req, res) => {
  try {
    const { userId, id } = req.params;
    const deletedItem = await prisma.experiences.findUnique({
      where: { id },
    });

    if (!deletedItem) {
      return res
        .status(404)
        .json(new Exceptions(404, "this experience doesn't exist"));
    }

    await prisma.experiences.delete({
      where: {
        id,
        usersId: userId,
      },
    });
    return res
      .status(200)
      .json(new Exceptions(200, "experience was deleted successfully."));
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

export default router;
