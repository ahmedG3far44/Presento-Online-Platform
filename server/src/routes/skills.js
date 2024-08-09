import express from "express";
import prisma from "../database/db.js";
import Exceptions from "../handlers/Exceptions.js";
import checkAccessUser from "../middlewares/checkAccessUser.js";
import { skillsSchema } from "../schemas/validationSchemas.js";

const router = express.Router();

router.post("/:userId/skills", checkAccessUser, async (req, res) => {
  const { userId } = req.params;
  const payload = req.body;
  const validSkillsPayload = skillsSchema.safeParse(payload);
  if (!validSkillsPayload.success) {
    return res.json(new Exceptions(400, "bad client request not valid data"));
  }
  await prisma.skills.create({
    data: { ...validSkillsPayload.data, usersId: userId },
  });
  console.log("a new skill added to user", userId);
  return res
    .status(201)
    .json(new Exceptions(201, "skill was created successful"));
});

router.put("/:userId/skills/:skillId", checkAccessUser, async (req, res) => {
  const { skillId, userId } = req.params;
  const payload = req.body;
  const updateSkill = await prisma.skills.findUnique({
    where: {
      id: skillId,
    },
  });
  if (!updateSkill) {
    return res.status(404).json(new Exceptions(404, "skill doesn't exist"));
  } else {
    const validSkillsPayload = skillsSchema.safeParse(payload);
    if (!validSkillsPayload.success) {
      return res
        .status(400)
        .json(
          new Exceptions(400, validSkillsPayload.error.flatten().fieldErrors)
        );
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
      .json(new Exceptions(404, "couldn't delete the skill"));
  }
  await prisma.skills.delete({
    where: {
      id,
      usersId: userId,
    },
  });
  console.log(`user ${userId} is deleted item id ${id} `);
  return res.status(200).json(new Exceptions(200, "skills was deleted "));
});

export default router;
