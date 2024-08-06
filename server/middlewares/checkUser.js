import prisma from "../database/db.js";
export default async function checkUser(req, res, next) {
  const { id, given_name, family_name, picture, email } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      await prisma.users.create({
        data: {
          id,
          name: `${given_name} ${family_name}`,
          email,
          picture,
          layout: 1,
        },
      });
      console.log("new user was created");
      return next();
    } else {
      console.log("user is exist ");
      return next();
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: error.message,
    });
  }
}
