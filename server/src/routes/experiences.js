import express from "express";
import prisma from "../database/db.js";
import { experienceSchema } from "../schemas/validationSchemas.js";
import checkAccessUser from "../middlewares/checkAccessUser.js";

const router = express.Router();

router.post("/:userId/experiences", async (req, res) => {
  const { userId } = req.params;
  const payload = req.body;
  const validExperiencePayload = experienceSchema.safeParse(payload);

  try {
    if (!validExperiencePayload.success) {
      return res.status(403).json({
        state: "error",
        message: validExperiencePayload.error.flatten().fieldErrors,
      });
    } else {
      await prisma.experiences.create({
        data: { ...validExperiencePayload.data, usersId: userId },
      });
      return res.status(200).json({
        state: "success",
        message: "experience added successfully done.",
      });
    }
  } catch (error) {
    return res.status(403).json({
      state: "connection error",
      message: error.message,
    });
  }
});
router.put("/:userId/experiences/:id", checkAccessUser, async (req, res) => {
  const { userId, id } = req.params;
  const payload = req.body;
  const validExperiencePayload = experienceSchema.safeParse(payload);

  try {
    if (!validExperiencePayload.success) {
      return res.status(403).json({
        state: "error",
        message: validExperiencePayload.error.flatten().fieldErrors,
      });
    } else {
      await prisma.experiences.update({
        where: {
          id,
          usersId: userId,
        },
        data: { ...validExperiencePayload.data, usersId: userId },
      });
      return res.status(200).json({
        state: "updated success",
        message: "experience updated successfully done.",
      });
    }
  } catch (error) {
    return res.status(403).json({
      state: "connection error",
      message: error.message,
    });
  }
});
router.delete("/:userId/experiences/:id", checkAccessUser, async (req, res) => {
  const { userId, id } = req.params;
  try {
    // before deleting items we should check it exist or not
    const deletedItem = await prisma.experiences.findUnique({
      where: { id },
    });
    //============================================
    if (!deletedItem) {
      return res.status(404).json({
        state: "delete error",
        message: "item doesn't exist",
      });
    }
    //============================================
    await prisma.experiences.delete({
      where: {
        id,
        usersId: userId,
      },
    });
    //============================================
    return res.status(200).json({
      state: "delete success",
      message: "experience deleted successful.",
    });
  } catch (error) {
    return res.status(500).json({
      state: "connection error",
      message: error.message,
    });
  }
});

export default router;
