"use client";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { bioSchema } from "@/lib/schema";

function BioForm({ bio, setBio }) {
  const status = useFormStatus();
  const router = useRouter();
  const { toast } = useToast();
  const [updateBioState, setUpdateBioState] = useState(true);

  const updateBioAction = async (e) => {
    e.preventDefault();
    try {
      console.log(bio);
      const validPayload = bioSchema.safeParse(bio);

      if (!validPayload.success) {
        toast({
          title: "field action",
          description: "data is not valid",
        });
        return {
          state: "error",
          errors: validPayload.error.flatten().fieldErrors,
          message: "not valid data",
        };
      }
      const request = await fetch(
        `http://localhost:4000/api/${bio?.usersId}/bio/${bio?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            heroImage: validPayload?.data?.heroImage,
            name: validPayload?.data?.bioName,
            jobTitle: validPayload?.data?.jobTitle,
            summary: validPayload?.data?.bio,
            layoutStyle: validPayload?.data?.layoutStyle,
          }),
        }
      );
      const data = request.json();
      if (request.ok) {
        console.log("the bio info was updated");
        toast({
          title: "success action",
          description: "bio information was updated done",
        });
        router.refresh("/bio");
        setUpdateBioState(true);
        return data;
      } else {
        data.catch((error) => {
          toast({
            variant: "destructive",
            title: "bad request",
            description: error.message,
          });
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "connection error can't update",
        description: error.message,
      });
    }
  };

  return (
    <div>
      <button
        className="px-4 py-2 hover:bg-muted border rounded-md"
        onClick={() => setUpdateBioState(!updateBioState)}
      >
        {updateBioState ? "update" : "updating..."}
      </button>
      <form
        onSubmit={updateBioAction}
        className="w-1/2 max-sm:w-full max-md:w-full mt-4 flex flex-col justify-start items-start gap-2 p-4 rounded-md border"
      >
        <input
          onChange={(e) => setBio({ ...bio, bioName: e.target.value })}
          className="w-full p-2 rounded-md read-only:bg-muted read-only:cursor-not-allowed bg-transparent border"
          type="text"
          name={"name"}
          placeholder="your name"
          readOnly={updateBioState}
          defaultValue={bio?.bioName}
        />
        <textarea
          maxLength={500}
          minLength={10}
          name={"bio"}
          onChange={(e) => setBio({ ...bio, bio: e.target.value })}
          className="w-full p-2 rounded-md read-only:bg-muted read-only:cursor-not-allowed bg-transparent border"
          placeholder="enter your summary here"
          readOnly={updateBioState}
          defaultValue={bio?.bio}
        ></textarea>
        <input
          onChange={(e) => setBio({ ...bio, jobTitle: e.target.value })}
          className="w-full p-2 rounded-md read-only:bg-muted read-only:cursor-not-allowed bg-transparent border"
          type="text"
          name={"jobTitle"}
          placeholder="current job title"
          readOnly={updateBioState}
          defaultValue={bio?.jobTitle}
        />
        <input
          onChange={(e) => setBio({ ...bio, heroImage: e.target.value })}
          className="w-full p-2 rounded-md read-only:bg-muted read-only:cursor-not-allowed bg-transparent border"
          type="url"
          name={"heroImage"}
          placeholder="hero image url"
          readOnly={updateBioState}
          defaultValue={bio?.heroImage}
        />
        <select
          onChange={(e) => setBio({ ...bio, layoutStyle: e.target.value })}
          required
          name="layout"
          className="w-full p-2 rounded-md disabled:bg-muted disabled:cursor-not-allowed  border"
          placeholder="select your layout"
          disabled={updateBioState}
          defaultValue={bio?.layoutStyle}
        >
          <option
            className="bg-primary-foreground p-4 rounded-md m-1"
            value="1"
          >
            Align Center
          </option>
          <option className="bg-primary-foreground  p-2" value="2">
            Align Start
          </option>
          <option
            className="bg-primary-foreground p-4 rounded-md m-1"
            value="3"
          >
            Align Row
          </option>
          <option
            className="bg-primary-foreground p-4 rounded-md m-1"
            value="4"
          >
            Align Row Reverse
          </option>
          <option
            className="bg-primary-foreground p-4 rounded-md m-1"
            value="5"
          >
            Align Between
          </option>
        </select>
        <span>{bio?.layoutStyle}</span>
        <input
          type="submit"
          aria-disabled={status.pending}
          value={status.pending ? "saving..." : "save changes"}
          className="w-full px-4 py-2 rounded-md hover:bg-primary-foreground duration-150 cursor-pointer disabled:bg-zinc-600 disabled:cursor-not-allowed  text-white border "
        />
      </form>
    </div>
  );
}

export default BioForm;
