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

export async function addExperience(newExperience) {
  const { user, isLogged } = await credentials();
  const result = experienceSchema.safeParse(newExperience);
  if (isLogged) {
    if (!result.success) {
      const errors = {
        error: "invalid server schema",
        message: "not valid data",
      };
      return errors;
    }
    try {
      const response = await fetch(
        `http://localhost:4000/api/${user?.id}/experiences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result?.data),
        }
      );
      console.log("experience post request done");
      response.json().then((res) => {
        console.log(res);
      });
      revalidatePath(`/experiences`);
      return;
    } catch (error) {
      const errors = {
        error: "can't add experiences",
        message: error.message,
      };
      return errors;
    }
  } else {
    redirect("api/auth/login");
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
  const data = new FormData();
  // data.append("file", file )
  // data.append("skillName", formData.get("skillName") )
  try {
    if (isLogged) {
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
