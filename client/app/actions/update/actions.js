"use server";
import credentials from "@/app/credentials/credentials";
import {
  bioSchema,
  experienceSchema,
  projectSchema,
  skillsSchema,
} from "@/lib/schema";
export async function updateBio(fromData, id) {}

export async function updateExperience(item, id) {
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
export async function updateProject(fromData, id) {}
export async function updateSkill(fromData, id) {}
