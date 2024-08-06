import express from "express";
import prisma from "../database/db.js";
import checkAccessUser from "../middlewares/checkAccessUser.js";
import { projectSchema } from "../schemas/validationSchemas.js";

const router = express.Router();

router.post("/:userId/projects/:projectId", async (req, res) => {
  const payload = req.body;
  const { userId, projectId } = req.params;

  const project = await prisma.projects.findUnique({
    where: {
      id: projectId,
      usersId: userId,
    },
  });
  if (!project) {
    return res.status(404).json({
      state: "not found error",
      message: "this project doesn't exist",
    });
  } else {
    if (payload.tags.length > 0 && payload.images.length > 0) {
      const tagsList = await prisma.tags.createMany({
        data: payload.tags.map((tag) => {
          return {
            tagName: tag,
            projectsId: projectId,
          };
        }),
      });
      const projectImagesList = await prisma.ImagesList.createMany({
        data: payload.images.map((projectImg) => {
          return {
            url: projectImg,
            projectsId: projectId,
          };
        }),
      });
      console.log("a new project was added successfully");
      return res
        .status(200)
        .json({ ...project, tags: tagsList, images: projectImagesList });
    } else {
      return res.status(403).json({
        state: "empty array error",
        message: "the images project list or tags list is empty",
      });
    }
  }
});
router.post("/:userId/projects", async (req, res) => {
  const { title, description, thumbnail, views, likes, tags } = req.body;
  const { userId } = req.params;
  // const validProjectPayload = projectSchema.safeParse(payload);
  const project = await prisma.projects.create({
    data: {
      title,
      description,
      thumbnail,
      likes,
      views,
      usersId: userId,
    },
  });

  return res.status(201).json({ state: "added successful", ...project });
});
router.get("/:userId/projects/:projectId", async (req, res) => {
  const { userId, projectId } = req.params;

  const project = await prisma.projects.findUnique({
    where: {
      id: projectId,
      usersId: userId,
    },
  });
  const tagsList = await prisma.tags.findMany({
    where: {
      projectsId: projectId,
    },
    select: {
      id: true,
      tagName: true,
    },
  });
  const imagesList = await prisma.ImagesList.findMany({
    where: {
      projectsId: projectId,
    },
    select: {
      url: true,
    },
  });

  return res.status(200).json({
    ...project,
    tags: tagsList,
    images: imagesList,
  });
});
router.get("/:userId/projects", async (req, res) => {
  const { userId } = req.params;

  const project = await prisma.projects.findMany({
    where: {
      usersId: userId,
    },
  });
  if (!project) {
    return res.status(404).json({
      state: "not found error",
      message: "user hasn't project yet",
    });
  }

  return res.status(200).json(project);
});
router.put(
  "/:userId/projects/:projectId",
  checkAccessUser,
  async (req, res) => {
    res.send("project's route is good");
  }
);
router.delete(
  "/:userId/projects/:projectId",
  checkAccessUser,
  async (req, res) => {
    res.send("project's route is good");
  }
);

export default router;
