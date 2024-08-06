import express from "express";
import prisma from "./database/db.js";
import rootRouter from "./routes/index.js";

const app = express();

prisma
  .$connect()
  .then(() => {
    console.log("db connection successful");
  })
  .catch(() => {
    console.log("db connection error");
  });

app.use(express.json());
app.use("/api", rootRouter);
app.get("/", async (req, res) => {
  try {
    const user = await prisma.users.findFirst();

    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
});

app.listen(4000, () => {
  console.log("application is working...");
});
