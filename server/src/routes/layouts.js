import express from "express";
import prisma from "../database/db.js";
import Exceptions from "../handlers/Exceptions.js";
import { layoutsSchema } from "../schemas/validationSchemas.js";

const router = express.Router();

router.put("/:userId/layouts/:layoutId", async (req, res) => {
  try {
    const { userId, layoutId } = req.params;
    const payload = req.body;

    const validLayoutsPayload = layoutsSchema.safeParse(payload);
    if (!validLayoutsPayload.success) {
      return res
        .status(400)
        .json(new Exceptions(400, "Bad request not valid data"));
    }
    await prisma.layouts.update({
      where: {
        usersId: userId,
        id: layoutId,
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
