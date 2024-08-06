import express from "express";
import usersRoute from "./users.js";
import expRoute from "./experiences.js";
import projectsRoute from "./projects.js";
import skillsRoute from "./skills.js";
import contactsRoute from "./contacts.js";
import bioRoute from "./bio.js";
import projectDetailsRoute from "./projectDetails.js";

const rootRouter = express.Router();

rootRouter.use("/", usersRoute);
rootRouter.use("/", bioRoute);
rootRouter.use("/", expRoute);
rootRouter.use("/", projectsRoute);
rootRouter.use("/", projectDetailsRoute);
rootRouter.use("/", skillsRoute);
rootRouter.use("/", contactsRoute);

export default rootRouter;
