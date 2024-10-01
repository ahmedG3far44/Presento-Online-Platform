"use server";
import credentials from "../../credentials/credentials";
import {
  bioSchema,
  experienceSchema,
  projectSchema,
  skillsSchema,
  layoutsSchema,
} from "../../../lib/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateExperience(id) {
  const { user, isLogged } = await credentials();

  try {
    if (isLogged) {
      const updatedExperienceInfo = {
        cName: fromData.get("cName"),
        cLogo: fromData.get("cLogo"),
        position: fromData.get("position"),
        role: fromData.get("role"),
        start: fromData.get("start"),
        end: fromData.get("end"),
        location: fromData.get("location"),
      };
      const validPayload = experienceSchema.safeParse(updatedExperienceInfo);

      if (!validPayload.success) {
        return validPayload.error.flatten().fieldErrors;
      }
      const response = await fetch(
        `http://localhost:4000/api/${user.id}/experiences/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validPayload.data),
        }
      );
      console.log("experience update request done");
      response.json().then((res) => {
        console.log(res);
      });
      revalidatePath("/experiences");
      return;
    } else {
      redirect("api/auth/login");
    }
  } catch (error) {
    return {
      error: "connection error can't add experience",
      message: error.message,
    };
  }
}
export async function updateProject(id) {}
export async function updateSkill(id) {
  const { user, isLogged } = await credentials();

  try {
    if (isLogged) {
      const updatedSkill = {
        skillName: fromData.get("skillName"),
        skillLogo: fromData.get("skillLogo"),
      };
      const validPayload = skillsSchema.safeParse(updatedSkill);

      if (!validPayload.success) {
        return validPayload.error.flatten().fieldErrors;
      }
      const response = await fetch(
        `http://localhost:4000/api/${user?.id}/skills/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validPayload.data),
        }
      );
      console.log("skill updated  done");
      response.json().then((res) => {
        console.log(res);
      });
      return;
    } else {
      redirect("api/auth/login");
    }
  } catch (error) {
    return {
      error: "connection error can't add experience",
      message: error.message,
    };
  }
}

export const updateLayoutsAction = async (layouts) => {
  const { user } = await credentials();
  const validLayouts = layoutsSchema.safeParse(layouts);
  if (!validLayouts.success) {
    const errors = {
      error: "not valid data",
      message: {
        expLayout: validLayouts.error.flatten().fieldErrors.expLayout,
        projectsLayout: validLayouts.error.flatten().fieldErrors.projectsLayout,
        skillsLayout: validLayouts.error.flatten().fieldErrors.skillsLayout,
      },
    };
    return errors;
  }
  try {
    const request = await fetch(
      `http://localhost:4000/api/${layouts?.usersId}/layouts/${layouts?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...validLayouts?.data }),
      }
    );

    const data = request.json();
    if (request.ok) {
      response.then((res) => {
        console.log(res);
      });
      revalidatePath(`/${user.id}`);
      return data;
    }
  } catch (error) {
    return {
      error: "connection error",
      message: error.message,
    };
  }
};
