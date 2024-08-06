import express from "express";
import prisma from "../database/db.js";
import checkAccessUser from "../middlewares/checkAccessUser.js";
import { projectSchema } from "../schemas/validationSchemas.js";
import { tuple } from "zod";

const router = express.Router();

router.post("/:userId/project", async (req, res) => {
  try {
    const payload = req.body;
    const { userId } = req.params;
    const validProjectData = projectSchema.safeParse(payload);
    if (!validProjectData.success) {
      return res.status(403).json({
        state: "not valid data",
        message: validProjectData.error.flatten().fieldErrors,
      });
    }
    //============================================
    const { title, description, thumbnail, likes, views, images, tags } =
      validProjectData.data;
    const newProject = await prisma.projects.create({
      data: {
        title,
        thumbnail,
        description,
        likes,
        views,
        usersId: userId,
      },
    });
    //============================================
    {
      tags.length > 0 &&
        (await prisma.tags.createMany({
          data: tags.map((tag) => {
            return {
              tagName: tag,
              projectsId: newProject.id,
            };
          }),
        }));
    }
    console.log("tags added to project");
    //============================================
    {
      images.length > 0 &&
        (await prisma.imagesList.createMany({
          data: images.map((img) => {
            return {
              url: img,
              projectsId: newProject.id,
            };
          }),
        }));
    }
    //============================================
    console.log("images added to project");
    return res.status(200).json({
      state: "project added",
      message: "a new project added successful",
    });
  } catch (error) {
    return res.status(500).json({
      state: "connection error",
      message: error.message,
    });
  }
});

router.get("/:userId/project/:projectId", async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const project = await prisma.projects.findFirst({
      where: {
        id: projectId,
        usersId: userId,
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        description: true,
        tags: {
          select: {
            id: true,
            tagName: true,
          },
        },
        ImagesList: {
          select: {
            id: true,
            url: true,
          },
        },
        likes: true,
        views: true,
      },
    });
    if (!project) {
      return res.status(404).json({
        state: "not found error",
        message: "the project doesn't found",
      });
    }
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({
      state: "connection error",
      message: error.message,
    });
  }
});

router.put("/:userId/project/:projectId", checkAccessUser, async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const payload = req.body;
    const validProjectData = projectSchema.safeParse(payload);
    if (!validProjectData.success) {
      return res.status(404).json({
        state: "not valid data payload",
        message: validProjectData.error.flatten().fieldErrors,
      });
    }

    //==============================================
    const { title, thumbnail, likes, views, description } =
      validProjectData.data;
    const updateProject = await prisma.projects.update({
      where: {
        id: projectId,
        usersId: userId,
      },
      data: {
        title,
        thumbnail,
        description,
        likes,
        views,
      },
    });

    return res.status(200).json({
      state: "update project",
      message: "project updated successful ",
      updateProject,
    });
  } catch (error) {
    return res.status(500).json({
      state: "connection error",
      message: error.message,
    });
  }
});

router.delete(
  "/:userId/project/:projectId",
  checkAccessUser,
  async (req, res) => {
    const { userId, projectId } = req.params;
    try {
      const project = await prisma.projects.findUnique({
        where: {
          id: projectId,
          usersId: userId,
        },
      });
      if (!project) {
        return res.status(404).json({
          state: 404,
          message: "not found item to delete!!",
        });
      } else {
        await prisma.tags.deleteMany({
          where: {
            projectsId: projectId,
          },
        });
        console.log("all tags deleted");
        await prisma.imagesList.deleteMany({
          where: {
            projectsId: projectId,
          },
        });
        console.log("all images deleted");
        await prisma.projects.deleteMany({
          where: {
            id: projectId,
            usersId: userId,
          },
        });
        console.log("the project deleted successful");
        return res.status(200).json({
          state: 200,
          message: "deleted project success",
        });
      }
    } catch (error) {
      return res.status(400).json({
        state: "connection error",
        message: error.message,
      });
    }
  }
);

export default router;
