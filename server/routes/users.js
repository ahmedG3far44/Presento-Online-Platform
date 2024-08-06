import express from "express";
import prisma from "../database/db.js";
import checkUser from "../middlewares/checkUser.js";
const router = express.Router();

router.post("/user", checkUser, async (req, res) => {
  const { id, given_name, family_name } = req.body;
});

router.get("/:userId/user", async (req, res) => {
  const { userId } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  try {
    if (!user) {
      return res.status(404).json({
        state: "error user",
        message: "user doesn't exist.",
      });
    } else {
      const [bio] = await prisma.bio.findMany({
        where: {
          usersId: userId,
        },
      });
      const projectsList = await prisma.projects.findMany({
        where: {
          usersId: userId,
        },
      });
      const experiencesList = await prisma.experiences.findMany({
        where: {
          usersId: userId,
        },
      });
      const skillsList = await prisma.skills.findMany({
        where: {
          usersId: userId,
        },
      });
      res.json({
        userId: user.id,
        name: user.name,
        bio: {
          jobTitle: bio?.jobTitle,
          heroImg: bio?.heroImage,
          summary: bio?.bio,
        },
        experiences: experiencesList,
        projects: projectsList,
        skills: skillsList,
        contacts: [
          {
            name: "Youtube",
            url: "https://youtube.com/ahmdedgjakfj",
          },
        ],
      });
    }
  } catch (error) {
    return res.status(500).json({
      state: "connection error",
      message: error.message,
    });
  }
});

export default router;
