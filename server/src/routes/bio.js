import express from "express";
import prisma from "../database/db.js";
import checkUser from "../middlewares/checkUser.js";
import { bioSchema } from "../schemas/validationSchemas.js";

const router = express.Router();

router.post("/:userId/bio", checkUser, async (req, res) => {
  const payload = req.body;
  const { userId } = req.params;
  try {
    const validBioPayload = bioSchema.safeParse(payload);
    if (!validBioPayload.success) {
      return res.json({
        error: 401,
        message: validBioPayload.error.flatten().fieldErrors,
      });
    }
    const { data } = validBioPayload;
    await prisma.bio.create({
      data: {
        heroImage: data.heroImage,
        bioName: data.name,
        jobTitle: data.jobTitle,
        bio: data.summary,
        usersId: userId,
      },
    });
    console.log("a new bio info was updated");
    return res.status(201).json({
      success: "added done",
      message: "bio info created successful",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: error.message,
    });
  }
});

router.put("/:userId/bio/:id", async (req, res) => {
  const payload = req.body;
  const { userId, id } = req.params;
  try {
    const validBioPayload = bioSchema.safeParse(payload);
    if (!validBioPayload.success) {
      return res.json({
        error: 401,
        message: validBioPayload.error.flatten().fieldErrors,
      });
    }
    const { data } = validBioPayload;
    await prisma.bio.update({
      where: {
        id,
        usersId: userId,
      },
      data: {
        heroImage: data.heroImage,
        bioName: data.name,
        jobTitle: data.jobTitle,
        bio: data.summary,
        usersId: userId,
      },
    });
    console.log("a new bio info was updated");
    return res.status(201).json({
      success: "updated done",
      message: "bio info updated successful",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: error.message,
    });
  }
});

export default router;
