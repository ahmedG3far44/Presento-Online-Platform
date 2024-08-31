import prisma from "../database/db.js";
import Exceptions from "../handlers/Exceptions.js";

export default async function checkAccessUser(req, res, next) {
  const { userId } = req.params;
  // const { access_token } = req.cookies;
  // const cookie = req.headers;
  // console.log("user cookies : ", cookie);
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json(new Exceptions(401, "UnAuthorized User"));
    }
    return next();
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
}
