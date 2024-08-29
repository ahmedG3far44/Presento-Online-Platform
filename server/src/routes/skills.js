import express from "express";
import prisma from "../database/db.js";
import Exceptions from "../handlers/Exceptions.js";
import checkAccessUser from "../middlewares/checkAccessUser.js";
import { skillsSchema } from "../schemas/validationSchemas.js";
import s3Client from "../s3/s3Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import dotenv from "dotenv";
import checkUploadImageFormat from "../middlewares/checkUploadImageFormat.js";

dotenv.config();

export const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get("/:userId/skills", checkAccessUser, async (req, res) => {
  const { userId } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res.status(404).json(new Exceptions(404, "user not found"));
  }
  const skillsList = await prisma.skills.findMany({
    where: {
      usersId: userId,
    },
  });
  console.log("get skills list");
  return res.status(202).json(skillsList);
});

router.post(
  "/:userId/skills",
  checkAccessUser,
  upload.single("file"),
  checkUploadImageFormat,
  async (req, res) => {
    const { userId } = req.params;
    const image = req.file;
    const payload = req.body;

    let nameKey;

    nameKey = `${userId}/skills/${Date.now()}-${changeToSlug(
      image.originalname
    )}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: nameKey,
      Body: image.buffer,
      ContentType: image.mimetype,
    });
    await s3Client
      .send(command)
      .then(() => {
        console.log("uploaded success");
      })
      .catch((error) => {
        console.log("not uploaded");
        return res
          .status(200)
          .send({ error: "not upload", message: error.message });
      });

    // const file = req.file;
    // console.log(file);
    // console.log(payload);
    // console.log(req.files);
    // res.send(payload);
    console.log(payload.skillName);

    // const validSkillsPayload = skillsSchema.safeParse(payload);
    // if (!validSkillsPayload.success) {
    //   return res.json(new Exceptions(400, "Bad request the data isn't valid"));
    // }
    const newSkill = await prisma.skills.create({
      data: {
        skillName: payload.skillName,
        skillLogo: `https://presento-app.s3.amazonaws.com/${nameKey}`,
        usersId: userId,
      },
    });

    //https://presento-app.s3.amazonaws.com/kp_3a7d740ac35f4862837192415dc03f67/skills/1724762244203-icons8-xml-40.png

    console.log("a new skill was added success");
    return res.status(201).json({ newSkill, success: "a new skill added" });
  }
);

router.put("/:userId/skills/:skillId", async (req, res) => {
  const { skillId, userId } = req.params;
  const payload = req.body;
  const updateSkill = await prisma.skills.findUnique({
    where: {
      id: skillId,
    },
  });
  if (!updateSkill) {
    return res
      .status(404)
      .json(new Exceptions(404, "this skill doesn't exist"));
  } else {
    const validSkillsPayload = skillsSchema.safeParse(payload);
    if (!validSkillsPayload.success) {
      return res
        .status(400)
        .json(new Exceptions(400, "Bad request the data isn't valid"));
    } else {
      const { data } = validSkillsPayload;
      await prisma.skills.update({
        where: {
          id: skillId,
          usersId: userId,
        },
        data: {
          skillName: data.skillName,
          skillLogo: data.skillLogo,
        },
      });
      console.log("updated skill info ");
      return res
        .status(200)
        .json(new Exceptions(200, "skill updated successfully"));
    }
  }
});

router.delete("/:userId/skills/:id", checkAccessUser, async (req, res) => {
  const { id, userId } = req.params;
  const deletedSkill = await prisma.skills.findUnique({
    where: {
      id,
      usersId: userId,
    },
  });
  if (!deletedSkill) {
    return res
      .status(404)
      .json(new Exceptions(404, "this skill doesn't exist error delete"));
  }
  await prisma.skills.delete({
    where: {
      id,
      usersId: userId,
    },
  });
  console.log("skill was deleted successful");
  return res.status(200).json(new Exceptions(200, "skills was deleted "));
});

export default router;

export function changeToSlug(text) {
  const newText = text.split(" ").join("");
  return newText;
}
