import express from "express";
import prisma from "../database/db.js";
import Exceptions from "../handlers/Exceptions.js";
import { contactsSchema } from "../schemas/validationSchemas.js";

const router = express.Router();

router.get("/:userId/contacts", async (req, res) => {
  res.send("contact route");
});
router.post("/:userId/contacts", async (req, res) => {
  try {
    const payload = req.boy;
    const { userId } = req.params;
    const validContactsUrls = contactsSchema.safeParse(payload);
    if (!validContactsUrls.success) {
      return res
        .status(404)
        .json(
          new Exceptions(400, validContactsUrls.error.flatten().fieldErrors)
        );
    }
    await prisma.contacts.create({
      data: { ...validContactsUrls.data, usersId: userId },
    });
    console.log("a new contacts info added successful");
    return res
      .status(201)
      .json(new Exceptions(201, "a new contact info was added successful."));
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
});
router.put("/userId/contacts  ", async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      state: "connection error",
      message: error,
    });
  }
});
router.delete("/contacts", async (req, res) => {
  res.json({
    delete: "contacts route",
  });
});

export default router;
