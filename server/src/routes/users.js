import express from "express";
import prisma from "../database/db.js";
import checkUser from "../middlewares/checkUser.js";

const router = express.Router();

router.post("/user", checkUser, async (req, res) => {
  return res.status(200);
});

router.get("/:userId/user", async (req, res) => {
  const { userId } = req.params;
  const user = await prisma.users.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      Bio: true,
      ExperiencesList: true,
      ProjectsList: true,
      SkillsList: true,
      ContactsList: true,
      Layouts: true,
    },
  });
  try {
    if (!user) {
      return res.status(404).json({
        state: "error user",
        message: "user doesn't exist.",
      });
    } else {
      return res.json(user);
    }
  } catch (error) {
    return res.status(500).json({
      state: "connection error",
      message: error.message,
    });
  }
});

export default router;
