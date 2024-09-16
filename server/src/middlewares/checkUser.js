import prisma from "../database/db.js";
import { userSchema } from "../schemas/validationSchemas.js";
import Exceptions from "../handlers/Exceptions.js";

export default async function checkUser(req, res, next) {
  try {
    const validUser = userSchema.safeParse(req.body);
    if (!validUser.success) {
      return res
        .status(404)
        .json(new Exceptions(400, "bad client data request"));
    }
    const userInfo = await prisma.users.findUnique({
      where: { id: validUser.data.id },
    });
    if (!userInfo) {
      console.log("user not exist creating a new user");
      const { given_name, family_name, id, email, picture, role } =
        validUser.data;
      const fullName = `${given_name} ${family_name}`;
      await prisma.users.create({
        data: {
          id,
          name: fullName,
          email,
          picture,
          role,
        },
      });

      await prisma.layouts.create({
        data: {
          usersId: id,
        },
      });
      await prisma.bio.create({
        data: {
          usersId: id,
        },
      });
      await prisma.contacts.create({
        data: {
          linkedin: "",
          github: "",
          youtube: "",
          twitter: "",
          usersId: validUser.data.id,
        },
      });
      console.log("a new user is created successfully.");
      return next();
    }
    console.log("user is exist ");
    return next();
  } catch (error) {
    return res.status(500).json(new Exceptions(500, error.message));
  }
}
