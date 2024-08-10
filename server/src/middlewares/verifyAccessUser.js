import { jwtVerify } from "@kinde-oss/kinde-node-express";
import Exceptions from "../handlers/Exceptions";
export default async function verifyAccessUser(req, res, next) {
  try {
    const headers = req.headers;
    const userHeaderToken = headers.split(" ")[1];
    const verifyToken = jwtVerify(userHeaderToken);
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
}
