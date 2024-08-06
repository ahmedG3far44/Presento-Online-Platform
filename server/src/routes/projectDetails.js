import express from "express";
import prisma from "../database/db.js";

const projectDetailsRoute = express.Router();

projectDetailsRoute.get("/:userId/project", async (req, res) => {
  const { userId } = req.params;
  try {
    const userProjects = await prisma.projects.findMany({
      where: {
        usersId: userId,
      },
      select: {
        id: true,
        thumbnail: true,
        title: true,
        tags: {
          select: {
            id: true,
            tagName: true,
          },
        },
        ImagesList: {
          select: {
            url: true,
          },
        },
        likes: true,
        views: true,
      },
    });
    if (!userProjects) {
      return res.status(404).json({
        state: 404,
        message: "not found project's",
      });
    }
    return res.status(200).json(userProjects);
  } catch (error) {
    return res.status(200).json({
      state: "connection error",
      message: error.message,
    });
  }
});

export default projectDetailsRoute;
