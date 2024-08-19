import express from "express";
import prisma from "../database/db.js";
import { bioSchema } from "../schemas/validationSchemas.js";
import Exceptions from "../handlers/Exceptions.js";

const router = express.Router();

router.get("/:userId/bio", async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.json(new Exceptions(404, "Bad request not valid user"));
    }
    const bio = await prisma.bio.findFirst({
      where: {
        usersId: userId,
      },
    });
    if (!bio) {
      return res.status(404).json(Exceptions(404, "bio not found"));
    }
    console.log("get bio info ");
    return res.status(200).json(bio);
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});
router.put("/:userId/bio/:bioId", async (req, res) => {
  const payload = req.body;
  const { userId, bioId } = req.params;
  try {
    const validBioPayload = bioSchema.safeParse(payload);
    if (!validBioPayload.success) {
      return res.json(new Exceptions(404, "Bad request not valid data"));
    }
    const { heroImage, name, summary, jobTitle, layoutStyle } =
      validBioPayload.data;
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
        layoutStyle,
      },
    });
    console.log("bio info was updated");
    return res
      .status(200)
      .json(new Exceptions(200, "bio information was updated successful"));
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});

export default router;
