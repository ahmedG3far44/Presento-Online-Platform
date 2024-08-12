import express from "express";
import prisma from "../database/db.js";
import Exceptions from "../handlers/Exceptions.js";

const router = express.Router();

router.get("/admin", async (req, res) => {
  try {
    const totalNumberProjects = await prisma.projects.count();
    const countViews = await prisma.projects.count({
      select: {
        views: true,
      },
    });
    const totalNumberUsers = await prisma.users.count();
    const allUsersInfo = await prisma.users.findMany();
    return res.status(200).json({
      totalUsers: totalNumberUsers,
      projects: totalNumberProjects,
      users: allUsersInfo,
      totalActions: countViews,
    });
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

export default router;
