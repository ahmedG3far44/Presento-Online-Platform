import express from "express";
import prisma from "../database/db.js";
import Exceptions from "../handlers/Exceptions.js";
import checkAccessUser from "../middlewares/checkAccessUser.js";
import { projectSchema } from "../schemas/validationSchemas.js";

const router = express.Router();

router.post("/:userId/project", async (req, res) => {
  try {
    const payload = req.body;
    const { userId } = req.params;
    const validProjectData = projectSchema.safeParse(payload);
    if (!validProjectData.success) {
      return res
        .status(400)
        .json(
          new Exceptions(400, validProjectData.error.flatten().fieldErrors)
        );
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
    return res
      .status(201)
      .json(new Exceptions(201, "a new project was created successfully"));
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
      return res
        .status(404)
        .json(new Exceptions(404, "this project doesn't exist"));
    }
    return res.status(200).json(project);
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

router.put("/:userId/project/:projectId", checkAccessUser, async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const payload = req.body;
    const validProjectData = projectSchema.safeParse(payload);
    if (!validProjectData.success) {
      return res
        .status(404)
        .json(
          new Exceptions(404, validProjectData.error.flatten().fieldErrors)
        );
    }

    //==============================================
    const { title, thumbnail, likes, views, description } =
      validProjectData.data;
    await prisma.projects.update({
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

    return res
      .status(200)
      .json(new Exceptions(200, "updated project info success."));
  } catch (error) {
    return res
      .status(500)
      .json(
        new Exceptions(
          500,
          "connection error or query parameters db is missing "
        )
      );
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
        return res
          .status(200)
          .json(new ErrorException(200, "project deleted successful"));
      }
    } catch (error) {
      return res
        .status(500)
        .json(new ErrorException(500, "query missing parameter"));
    }
  }
);

export default router;
