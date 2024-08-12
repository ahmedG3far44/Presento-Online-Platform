"use server";
import credentials from "@/app/credentials/credentials";
import { revalidatePath } from "next/cache";

export async function deleteExperience(id) {
  const { user, isLogged } = await credentials();
  try {
    const requestDelete = await fetch(
      `http://localhost:4000/api/${user.id}/experiences/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = requestDelete.json();
    revalidatePath(`/experiences`);
    return data;
  } catch (error) {
    return {
      error: "cant't delete experiences",
      message: error.message,
    };
  }
}
export async function deleteProject(fromData, id) {}
export async function deleteSkill(fromData, id) {}
