import express from "express";
import dotenv from "dotenv";
import prisma from "./database/db.js";
import rootRouter from "./routes/index.js";
import cors from "cors";
import { setupKinde, GrantType } from "@kinde-oss/kinde-node-express";
dotenv.config();

const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : window.location.origin, // Allow only requests from this origin
  methods: "GET,POST, PUT, DELETE", // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
};

const config = {
  clientId: process.env.KINDE_CLIENT_ID,
  issuerBaseUrl: process.env.KINDE_ISSUER_URL,
  siteUrl: "http://localhost:3000",
  secret: process.env.KINDE_CLIENT_SECRET,
  redirectUrl: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
  grantType: GrantType.AUTHORIZATION_CODE,
  unAuthorisedUrl: "http://localhost:3000",
  postLogoutRedirectUrl: "http://localhost:3000",
};

setupKinde(config, app);

prisma
  .$connect()
  .then(() => {
    console.log("db connection successful");
  })
  .catch(() => {
    console.log("db connection error");
  });

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api", rootRouter);

app.get("/", async (req, res) => {
  res.send("APP is working....");
});

app.listen(process.env.PORT, () => {
  console.log("application is working...");
});
