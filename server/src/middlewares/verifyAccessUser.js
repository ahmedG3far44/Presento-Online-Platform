import dotenv from "dotenv";
import { jwtVerify } from "@kinde-oss/kinde-node-express";
import { experienceSchema } from "../schemas/validationSchemas";
import Exceptions from "../handlers/Exceptions";
dotenv.config();
const verifier = jwtVerify("https://portfoliowebapplication.kinde.com");
async function verifyAccessUser(req, res) {
  try {
    const header = req.headers;
    const token = header.split(" ")[1];
    const payload = await jwtVerify(token);
  } catch (error) {
    return Exceptions(500, error.message);
  }
}
