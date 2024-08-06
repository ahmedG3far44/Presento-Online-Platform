import express from "express";
import prisma from "../database/db.js";
import { skillsSchema } from "../schemas/validationSchemas.js";
import checkAccessUser from "../middlewares/checkAccessUser.js";

const router = express.Router();

router.post("/:userId/skills", checkAccessUser, async (req, res) => {
  const { userId } = req.params;
  const payload = req.body;
  const validSkillsPayload = skillsSchema.safeParse(payload);
  if (!validSkillsPayload.success) {
    return res.json({
      state: "not valid error",
      message: validSkillsPayload.error.flatten().fieldErrors,
    });
  }
  await prisma.skills.create({
    data: { ...validSkillsPayload.data, usersId: userId },
  });
  console.log("a new skill added to user", userId);
  res.status(201).json({
    state: "success",
    message: "added skill successfully.",
  });
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
    return res.status(404).json({
      status: 404,
      message: "skill item doesn't exist.",
    });
  } else {
    const validSkillsPayload = skillsSchema.safeParse(payload);
    if (!validSkillsPayload.success) {
      return res.status(400).json({
        status: 403,
        message: validSkillsPayload.error.flatten().fieldErrors,
      });
    } else {
      const { data } = validSkillsPayload;
      const updatedSkills = await prisma.skills.update({
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
      return res.status(200).json({
        success: "done",
        message: "updated skill info",
        ...updatedSkills,
      });
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
    return res.status(404).json({
      state: "can't delete",
      message: "this items doesn't exist.",
    });
  }
  await prisma.skills.delete({
    where: {
      id,
      usersId: userId,
    },
  });
  console.log(`user ${userId} is deleted item id ${id} `);
  return res.status(200).json({
    state: "success",
    message: "deleted successful",
  });
});

export default router;
