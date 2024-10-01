"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  experienceSchema,
  projectSchema,
  skillsSchema,
} from "../../../../../lib/schema";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { LuFileEdit } from "react-icons/lu";

function UpdateBtn({ initialUpdate, sectionName }) {
  const [updateItem, setUpdatedItem] = useState(initialUpdate);
  const status = useFormStatus();
  const { toast } = useToast();
  const router = useRouter();
  const handleUpdateExperience = async (e) => {
    e.preventDefault();
    try {
      const validPayload = experienceSchema.safeParse(updateItem);

      if (!validPayload.success) {
        toast({
          title: "field action",
          description: "data is not valid",
        });
        return validPayload.error.flatten().fieldErrors;
      }
      const request = await fetch(
        `http://localhost:4000/api/${initialUpdate?.usersId}/experiences/${initialUpdate?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validPayload.data),
        }
      );
      const data = request.json();
      console.log("the experiences updated");
      toast({
        title: "success action",
        description: "experience updated done",
      });
      router.refresh("/experiences");
      return data;
    } catch (error) {
      toast({
        title: "connection error can't update",
        description: error.message,
      });
    }
  };
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const validPayload = projectSchema.safeParse(updateItem);

      if (!validPayload.success) {
        toast({
          title: "field action",
          description: "data is not valid",
        });
        return validPayload.error.flatten().fieldErrors;
      }
      const request = await fetch(
        `http://localhost:4000/api/${initialUpdate?.usersId}/projects/${initialUpdate?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validPayload.data),
        }
      );
      const data = request.json();
      console.log("the project updated");
      toast({
        title: "success action",
        description: "project updated done",
      });
      router.refresh("/projects");
      return data;
    } catch (error) {
      toast({
        title: "connection error can't update",
        description: error.message,
      });
    }
  };
  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    try {
      const validPayload = skillsSchema.safeParse(updateItem);
      if (!validPayload.success) {
        toast({
          title: "field action",
          description: "data is not valid",
        });
        return validPayload.error.flatten().fieldErrors;
      }
      const request = await fetch(
        `http://localhost:4000/api/${initialUpdate?.usersId}/skills/${initialUpdate?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validPayload.data),
        }
      );
      const data = request.json();
      console.log("the skill updated");
      toast({
        title: "success action",
        description: "skill updated done",
      });
      router.refresh();
      return data;
    } catch (error) {
      toast({
        title: "connection error can't update",
        description: error.message,
      });
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <span className=" hover:text-zinc-800 duration-150">
            <LuFileEdit size={20} />
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>update experience form</DialogTitle>
            <DialogDescription>
              updating item with ID: {initialUpdate.id}
            </DialogDescription>
          </DialogHeader>

          {sectionName === "experiences" && (
            <form
              onSubmit={handleUpdateExperience}
              className="w-full sm:w-full flex flex-col justify-start items-start gap-2 p-4 rounded-md border"
            >
              <input
                className="p-2 w-full rounded-md "
                type="text"
                name="cName"
                placeholder="company name"
                defaultValue={initialUpdate.cName}
                onChange={(e) =>
                  setUpdatedItem({ ...updateItem, cName: e.target.value })
                }
              />
              <input
                className="p-2 w-full rounded-md "
                type="url"
                name="cLogo"
                placeholder="company logo url"
                defaultValue={initialUpdate.cLogo}
                onChange={(e) =>
                  setUpdatedItem({ ...updateItem, cLogo: e.target.value })
                }
              />
              <input
                className="p-2 w-full rounded-md"
                type="text"
                name="position"
                placeholder="your position or Job-title"
                defaultValue={initialUpdate.position}
                onChange={(e) =>
                  setUpdatedItem({ ...updateItem, position: e.target.value })
                }
              />
              <textarea
                className="w-full  p-2 rounded-md"
                placeholder="my role "
                name="role"
                id="role"
                defaultValue={initialUpdate.role}
                onChange={(e) =>
                  setUpdatedItem({ ...updateItem, role: e.target.value })
                }
              ></textarea>
              <div className="w-full flex justify-start items-center gap-4 mb-1 sm:flex-wrap">
                <label className="w-full text-sm">
                  Start Date
                  <input
                    className="p-2 w-full rounded-md "
                    type="date"
                    name="start"
                    placeholder="start date"
                    defaultValue={initialUpdate.start}
                    onChange={(e) =>
                      setUpdatedItem({ ...updateItem, start: e.target.value })
                    }
                  />
                </label>
                <label className="w-full text-sm ">
                  End Date
                  <input
                    className="p-2 w-full rounded-md "
                    type="date"
                    name="end"
                    placeholder="end date"
                    defaultValue={initialUpdate.end}
                    onChange={(e) =>
                      setUpdatedItem({ ...updateItem, end: e.target.value })
                    }
                  />
                </label>
              </div>
              <input
                className="p-2 w-full rounded-md "
                type="text"
                name="location"
                placeholder="enter the job location"
                defaultValue={initialUpdate.location}
                onChange={(e) =>
                  setUpdatedItem({ ...updateItem, location: e.target.value })
                }
              />
              <input
                type="submit"
                className="w-full py-2 rounded-md border  hover:bg-zinc-900 duration-150 cursor-pointer disabled:bg-zinc-600 disabled:cursor-not-allowed"
                value={status.pending ? "updating..." : "update"}
                disabled={status.pending}
              />
            </form>
          )}
          {sectionName === "projects" && (
            <form
              onSubmit={handleUpdateProject}
              className="w-full sm:w-full flex flex-col justify-start items-start gap-2 p-4 rounded-md border"
            >
              <input
                className="p-2 w-full rounded-md "
                type="text"
                name="title"
                placeholder="project title"
                defaultValue={initialUpdate?.title}
                onChange={(e) =>
                  setUpdatedItem({ ...updateItem, title: e.target.value })
                }
              />
              <input
                className="p-2 w-full rounded-md "
                type="url"
                name="thumbnail"
                placeholder="thumbnail logo url"
                defaultValue={initialUpdate.thumbnail}
                onChange={(e) =>
                  setUpdatedItem({ ...updateItem, thumbnail: e.target.value })
                }
              />

              <textarea
                className="w-full  p-2 rounded-md"
                placeholder="project description"
                name="description"
                defaultValue={initialUpdate.description}
                onChange={(e) =>
                  setUpdatedItem({ ...updateItem, description: e.target.value })
                }
              ></textarea>
              <input
                type="submit"
                className="w-full py-4 rounded-md border hover:bg-zinc-900 duration-150 cursor-pointer disabled:bg-zinc-600 disabled:cursor-not-allowed"
                value={status.pending ? "updating..." : "update"}
                disabled={status.pending}
              />
            </form>
          )}
          {sectionName === "skills" && (
            <form
              onSubmit={handleUpdateSkill}
              className="w-full sm:w-full flex flex-col justify-start items-start gap-2 p-4 rounded-md"
            >
              <input
                className="p-2 w-full rounded-md "
                type="text"
                name="skillName"
                placeholder="skill name"
                defaultValue={initialUpdate.skillName}
                onChange={(e) =>
                  setUpdatedItem({ ...updateItem, skillName: e.target.value })
                }
              />
              <input
                className="p-2 w-full rounded-md "
                type="url"
                name="skill logo"
                placeholder="skill logo url"
                defaultValue={initialUpdate.skillLogo}
                onChange={(e) =>
                  setUpdatedItem({ ...updateItem, skillLogo: e.target.value })
                }
              />
              <input
                type="submit"
                className="w-full py-2 rounded-md border  hover:bg-zinc-900 duration-150 cursor-pointer disabled:bg-zinc-600 disabled:cursor-not-allowed"
                value={status.pending ? "updating..." : "update"}
                disabled={status.pending}
              />
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateBtn;
