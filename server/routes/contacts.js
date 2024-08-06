import express from "express";

const router = express.Router();

router.get("/contacts", async (req, res) => {
  res.send("contact route");
});
router.post("/contacts", async (req, res) => {
  res.json({
    post: "contacts route",
  });
});
router.put("/contacts", async (req, res) => {
  res.json({
    put: "contacts route",
  });
});
router.delete("/contacts", async (req, res) => {
  res.json({
    delete: "contacts route",
  });
});

export default router;
