import express from "express";
import prisma from "../database/db.js";
import Exceptions from "../handlers/Exceptions.js";
import { layoutsSchema } from "../schemas/validationSchemas.js";

const router = express.Router();

router.get("/:userId/layouts", async (req, res) => {
  try {
    const { userId } = req.params;

    const userLayouts = await prisma.layouts.findFirst({
      where: {
        usersId: userId,
      },
    });
    if (!userLayouts) {
      return res
        .status(400)
        .json(new Exceptions(400, "Bad request not found layouts"));
    }
    console.log("get user layouts");
    return res.status(200).json(userLayouts);
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

router.put("/:userId/layouts/:id", async (req, res) => {
  try {
    const { userId, id } = req.params;
    const payload = req.body;
    console.log(payload, userId, id);

    const validLayoutsPayload = layoutsSchema.safeParse(payload);
    if (!validLayoutsPayload.success) {
      return res
        .status(400)
        .json(new Exceptions(400, "Bad request not valid data"));
    }
    console.log(validLayoutsPayload.data);
    await prisma.layouts.update({
      where: {
        usersId: userId,
        id,
      },
      data: { ...validLayoutsPayload.data },
    });
    console.log("updated user layouts");
    return res
      .status(200)
      .json(new Exceptions(200, "layout info was updated successfully"));
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

export default router;
