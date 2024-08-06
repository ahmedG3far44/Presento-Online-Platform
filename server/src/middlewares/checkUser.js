import prisma from "../database/db.js";
import { userSchema } from "../schemas/validationSchemas.js";
export default async function checkUser(req, res) {
  const validUser = userSchema.safeParse(req.body);
  if (validUser.success) {
    const userInfo = await prisma.users.findUnique({
      where: { id: validUser.data.id },
      select: {
        id: true,
        name: true,
        email: true,
        Bio: true,
        ExperiencesList: true,
        ProjectsList: true,
        SkillsList: true,
        ContactsList: true,
        Layouts: true,
      },
    });
    if (!userInfo) {
      const { given_name, family_name, id, email, picture } = validUser.data;
      await prisma.users.create({
        data: {
          id,
          name: `${given_name} ${family_name}`,
          email,
          picture,
        },
      });
      console.log("a new user is created successfully.");

      const newUserInfo = await prisma.users.findUnique({
        where: { id: validUser.data.id },
        select: {
          id: true,
          name: true,
          email: true,
          Bio: true,
          ExperiencesList: true,
          ProjectsList: true,
          SkillsList: true,
          ContactsList: true,
          Layouts: true,
        },
      });
      return res.status(201).json({
        state: "create a new user",
        ...newUserInfo,
      });
    } else {
      return res.status(200).json({
        state: "user is exist",
        ...userInfo,
      });
    }
  } else {
    return res.status(404).json({
      state: "not valid user payload data",
      message: validUser.error.flatten().fieldErrors,
    });
  }
}
