"use server";
import {
  bioSchema,
  experienceSchema,
  projectSchema,
  skillsSchema,
} from "@/lib/schema";
import credentials from "@/app/credentials/credentials";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export async function addExperience(formData) {
  const { user, isLogged } = await credentials();
  try {
    if (isLogged) {
      const newExperienceInfo = {
        cName: formData.get("cName"),
        cLogo: formData.get("cLogo"),
        position: formData.get("position"),
        role: formData.get("role"),
        start: formData.get("start"),
        end: formData.get("end"),
        location: formData.get("location"),
      };

      console.log({
        ...newExperienceInfo,
        state: "not valid yet",
        userId: user.id,
        loginState: isLogged,
      });

      const validPayload = experienceSchema.safeParse(newExperienceInfo);
      if (!validPayload.success) {
        return {
          error: "not valid data",
          fieldErrors: validPayload.error.flatten().fieldErrors,
        };
      }

      const response = await fetch(
        `http://localhost:4000/api/${user.id}/experiences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validPayload.data),
        }
      );
      console.log("experience post request done");
      response.json().then((res) => {
        console.log(res);
      });
      revalidatePath(`/experiences`);
      return {
        success: "success added",
        message: "a new experiences was created successful",
      };
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
export async function addProject(formData) {
  try {
    const project = {
      title: formData.get("title"),
      description: formData.get("description"),
      thumbnail: formData.get("thumbnail"),
      liveLink: formData.get("liveLink"),
      sourceLink: formData.get("sourceLink"),
    };
  } catch (error) {
    return {
      state: "error adding project",
      message: error.message,
    };
  }
}

export async function addSkill(formData) {
  const { user, isLogged } = await credentials();
  try {
    if (isLogged) {
      const newSkillInfo = {
        skillName: formData.get("skillName"),
        skillLogo: formData.get("skillLogo"),
      };

      console.log(newSkillInfo);

      const validPayload = skillsSchema.safeParse(newSkillInfo);
      if (!validPayload.success) {
        return validPayload.error.flatten().fieldErrors;
      }

      const response = await fetch(
        `http://localhost:4000/api/${user.id}/skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validPayload.data),
        }
      );
      console.log("new skill added  request done");
      response.json().then((res) => {
        console.log(res);
      });
      revalidatePath(`/skills`);
      return;
    } else {
      redirect("api/auth/login");
    }
  } catch (error) {
    return {
      error: "connection error can't add a new skill",
      message: error.message,
    };
  }
}
