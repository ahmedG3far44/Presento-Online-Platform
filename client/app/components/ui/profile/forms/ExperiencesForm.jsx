"use client";

import { useToast } from "@/components/ui/use-toast";
import { useFormStatus } from "react-dom";
import { addExperience } from "@/app/actions/create/actions";
import { useRef } from "react";

function ExperiencesForm({ experiencesObject, setExperiencesObject }) {
  const { toast } = useToast();
  const status = useFormStatus();
  const ref = useRef(null);

  const addExperienceAction = async (formData) => {
    await addExperience(formData);
    toast({
      title: "success added",
      description: "a new experiences was added successful",
    });
    ref.current?.reset();
  };

  return (
    <form
      ref={ref}
      action={addExperienceAction}
      className="lg:w-1/3  min-w-96 w-full sm:w-full flex flex-col justify-start items-start gap-2 p-4 rounded-md border"
    >
      <input
        className="p-2 w-full rounded-md "
        type="text"
        name="cName"
        placeholder="company name"
        onChange={(e) =>
          setExperiencesObject({ ...experiencesObject, cName: e.target.value })
        }
      />
      <input
        className="p-2 w-full rounded-md "
        type="url"
        name="cLogo"
        placeholder="company logo url"
        onChange={(e) =>
          setExperiencesObject({ ...experiencesObject, cLogo: e.target.value })
        }
      />
      <input
        className="p-2 w-full rounded-md"
        type="text"
        name="position"
        placeholder="your position or Job-title"
        onChange={(e) =>
          setExperiencesObject({
            ...experiencesObject,
            position: e.target.value,
          })
        }
      />
      <textarea
        className="w-full  p-2 rounded-md"
        placeholder="my role "
        name="role"
        onChange={(e) =>
          setExperiencesObject({ ...experiencesObject, role: e.target.value })
        }
      ></textarea>
      <div className="w-full flex justify-start items-start gap-4 mb-1 md:flex-wrap">
        <label className="w-full text-sm">
          Start Date
          <input
            className="p-2 w-full rounded-md "
            type="date"
            name="start"
            placeholder="start date"
            onChange={(e) =>
              setExperiencesObject({
                ...experiencesObject,
                start: e.target.value,
              })
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
            onChange={(e) =>
              setExperiencesObject({
                ...experiencesObject,
                end: e.target.value,
              })
            }
          />
        </label>
      </div>
      <input
        className="p-2 w-full rounded-md "
        type="text"
        name="location"
        placeholder="enter the job location"
        onChange={(e) =>
          setExperiencesObject({
            ...experiencesObject,
            location: e.target.value,
          })
        }
      />
      <input
        variant="outline"
        className={`w-full hover:bg-zinc-900 duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed p-2  border rounded-md`}
        type="submit"
        disabled={status.pending}
        value={status.pending ? "loading..." : "add"}
      />
    </form>
  );
}

export default ExperiencesForm;
