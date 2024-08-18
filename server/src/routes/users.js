import express from "express";
import prisma from "../database/db.js";
import checkUser from "../middlewares/checkUser.js";
import Exceptions from "../handlers/Exceptions.js";

const router = express.Router();

router.post("/user", checkUser, async (req, res) => {
  try {
    const payload = req.body;
    const userInfo = await prisma.users.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        ExperiencesList: true,
        ProjectsList: true,
        SkillsList: true,
        ContactsList: true,
        Layouts: {
          select: {
            heroLayout: true,
            expLayout: true,
            projectsLayout: true,
            skillsLayout: true,
          },
        },
      },
    });
    const bio = await prisma.bio.findFirst({
      where: {
        usersId: payload.id,
      },
    });
    return res.status(200).json({ ...userInfo, bio });
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

router.get("/:userId/user", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
        picture: true,
        name: true,
        ExperiencesList: true,
        ProjectsList: true,
        SkillsList: true,
        Layouts: true,
        createdAt: true,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json(new Exceptions(404, "this user doesn't exist"));
    } else {
      const bio = await prisma.bio.findFirst({
        where: {
          usersId: userId,
        },
      });
      const contacts = await prisma.contacts.findFirst({
        where: {
          usersId: userId,
        },
      });
      return res.json({ ...user, bio, contacts });
    }
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

export default router;
