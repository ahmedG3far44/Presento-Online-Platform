import express from "express";
import prisma from "../database/db.js";
import { bioSchema } from "../schemas/validationSchemas.js";
import Exceptions from "../handlers/Exceptions.js";

const router = express.Router();

router.put("/:userId/bio/:bioId", async (req, res) => {
  const payload = req.body;
  const { userId, bioId } = req.params;
  try {
    const validBioPayload = bioSchema.safeParse(payload);
    if (!validBioPayload.success) {
      return res.json(new Exceptions(404, "Bad request not valid data"));
    }
    const { heroImage, name, summary, jobTitle } = validBioPayload.data;
    await prisma.bio.update({
      where: {
        id: bioId,
        usersId: userId,
      },
      data: {
        heroImage,
        bioName: name,
        jobTitle,
        bio: summary,
      },
    });
    console.log("a new bio info was updated");
    return res
      .status(200)
      .json(new Exceptions(200, "bio information was updated successful"));
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

export default router;
