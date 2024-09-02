"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { bioSchema } from "@/lib/schema";

function BioForm({ bio, setBio }) {
  const status = useFormStatus();
  const router = useRouter();
  const { toast } = useToast();
  const [updateBioState, setUpdateBioState] = useState(true);
  const [loading, setLoading] = useState(false);

  const updateBioAction = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(bio);
    const validPayload = bioSchema.safeParse(bio);

    console.log(validPayload.data);

    if (!validPayload.success) {
      toast({
        variant: "destructive",
        title: "field action",
        description: "error data not valid",
      });
    }
    try {
      const request = await fetch(
        `http://localhost:4000/api/${bio?.usersId}/bio/${bio?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: validPayload?.data?.bioName,
            jobTitle: validPayload?.data?.jobTitle,
            summary: validPayload?.data?.bio,
          }),
        }
      );
      if (request.status === 200) {
        toast({
          title: "updated bio info",
          description: "successful updated ",
        });
      }
      router.refresh();
      setUpdateBioState(true);
      return;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "updating info failed",
        description: error.message,
      });
      return;
    } finally {
      setLoading(true);
      return;
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
        className="lg:w-1/2 w-3/4 max-sm:w-full max-md:w-full mt-4 flex flex-col justify-start items-start gap-2 p-4 rounded-md border"
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
        <select
          onChange={(e) => setBio({ ...bio, layoutStyle: e.target.value })}
          required
          name="layout"
          className="w-full p-2 rounded-md disabled:bg-muted disabled:cursor-not-allowed  border"
          placeholder="select your layout"
          disabled={updateBioState}
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
        <input
          type="submit"
          aria-disabled={loading}
          value={loading ? "updating..." : "save changes"}
          className="w-full px-4 py-2 rounded-md hover:bg-primary-foreground duration-150 cursor-pointer disabled:bg-zinc-600 disabled:cursor-not-allowed  text-white border "
        />
      </form>
    </div>
  );
}

export default BioForm;
