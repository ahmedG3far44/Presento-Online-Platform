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

export async function addExperience(fromData) {
  const { user, isLogged } = await credentials();
  try {
    if (isLogged) {
      const newExperienceInfo = {
        cName: fromData.get("cName"),
        cLogo: fromData.get("cLogo"),
        position: fromData.get("position"),
        role: fromData.get("role"),
        start: fromData.get("start"),
        end: fromData.get("end"),
        location: fromData.get("location"),
      };

      console.log({
        ...newExperienceInfo,
        state: "not valid yet",
        userId: user.id,
        loginState: isLogged,
      });

      const validPayload = experienceSchema.safeParse(newExperienceInfo);
      if (!validPayload.success) {
        return validPayload.error.flatten().fieldErrors;
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
export async function addProject(fromData) {}
export async function addSkill(fromData) {}
