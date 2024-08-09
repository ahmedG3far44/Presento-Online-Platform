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
        Bio: {
          select: {
            bioName: true,
            jobTitle: true,
            heroImage: true,
            bio: true,
          },
        },
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
    return res.status(201).json(userInfo);
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
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
      return res
        .status(404)
        .json(new Exceptions(404, "this user doesn't exist"));
    } else {
      return res.json(user);
    }
  } catch (error) {
    return res
      .status(500)
      .json(
        new Exceptions(
          500,
          "server connection error or query parameters is missing."
        )
      );
  }
});

export default router;
