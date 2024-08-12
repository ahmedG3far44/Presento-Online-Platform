import express from "express";
import prisma from "../database/db.js";
import Exceptions from "../handlers/Exceptions.js";
import checkAccessUser from "../middlewares/checkAccessUser.js";
import { experienceSchema } from "../schemas/validationSchemas.js";

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

router.get("/:userId/experiences/:experienceId", async (req, res) => {
  try {
    const { userId, experienceId } = req.params;
    const experience = await prisma.experiences.findUnique({
      where: {
        usersId: userId,
        id: experienceId,
      },
    });
    if (!experience) {
      return res.status(200).json({ experience: "not items found" });
    }
    return res.status(200).json(experience);
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

router.post("/:userId/experiences", async (req, res) => {
  try {
    const { userId } = req.params;
    const payload = req.body;
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
      await prisma.experiences.create({
        data: { ...validExperiencePayload.data, usersId: userId },
      });
      console.log("a new experience add to user");
      return res
        .status(201)
        .json(new Exceptions(201, "a new experience was created successful"));
    }
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});
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
