import prisma from "../database/db.js";
export default async function checkAccessUser(req, res, next) {
  const { userId } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        error: "user have no access to this action",
      });
    }
    return next();
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
}
