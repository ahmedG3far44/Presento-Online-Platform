"use client";

import { useToast } from "@/components/ui/use-toast";
import { useFormStatus, useFormState } from "react-dom";
import { addExperience } from "@/app/actions/create/actions";
import { useRef } from "react";

function ExperiencesForm({ experiencesObject, setExperiencesObject }) {
  const { toast } = useToast();
  const status = useFormStatus();
  const ref = useRef(null);

  const addExperienceAction = async (formData) => {
    await addExperience(formData)
      .then((res) => {
        toast({
          title: res?.success,
          description: res?.message,
        });
        ref.current?.reset();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.error,
          description: error.message,
        });
      });
  };

  const [state, serverAction] = useFormState(
    addExperienceAction,
    experiencesObject
  );
  return (
    <form
      ref={ref}
      action={serverAction}
      className="lg:w-1/3  min-w-96 w-full sm:w-full flex flex-col justify-start items-start gap-2 p-4 rounded-md border"
    >
      <input
        className="p-2 w-full rounded-md "
        type="text"
        name="cName"
        placeholder="company name"
        required
        onChange={(e) =>
          setExperiencesObject({ ...experiencesObject, cName: e.target.value })
        }
      />

      {state?.error && (
        <div className="text-destructive p-1 w-full">
          <p>{state?.fieldErrors?.cName}</p>
        </div>
      )}

      <input
        className="p-2 w-full rounded-md "
        type="url"
        name="cLogo"
        placeholder="company logo url"
        required
        onChange={(e) =>
          setExperiencesObject({ ...experiencesObject, cLogo: e.target.value })
        }
      />
      {state?.error && (
        <div className="text-destructive p-1 w-full">
          <p>{state?.fieldErrors?.cLogo}</p>
        </div>
      )}
      <input
        className="p-2 w-full rounded-md"
        type="text"
        name="position"
        placeholder="your position or Job-title"
        required
        onChange={(e) =>
          setExperiencesObject({
            ...experiencesObject,
            position: e.target.value,
          })
        }
      />
      {state?.error && (
        <div className="text-destructive p-1 w-full">
          <p>{state?.fieldErrors?.position}</p>
        </div>
      )}
      <textarea
        className="w-full  p-2 rounded-md"
        placeholder="my role "
        name="role"
        onChange={(e) =>
          setExperiencesObject({ ...experiencesObject, role: e.target.value })
        }
      ></textarea>
      {state?.error && (
        <div className="text-destructive p-1 w-full">
          <p>{state?.fieldErrors?.role}</p>
        </div>
      )}
      <div className="w-full flex justify-start items-start gap-4 mb-1 md:flex-wrap">
        <label className="w-full text-sm">
          Start Date
          <input
            className="p-2 w-full rounded-md "
            type="date"
            name="start"
            aria-required
            placeholder="start date"
            onChange={(e) =>
              setExperiencesObject({
                ...experiencesObject,
                start: e.target.value,
              })
            }
          />
          {state?.error && (
            <div className="text-destructive p-1 w-full">
              <p>{state?.fieldErrors?.start}</p>
            </div>
          )}
        </label>
        <label className="w-full text-sm ">
          End Date
          <input
            className="p-2 w-full rounded-md "
            type="date"
            name="end"
            aria-required
            placeholder="end date"
            onChange={(e) =>
              setExperiencesObject({
                ...experiencesObject,
                end: e.target.value,
              })
            }
          />
          {state?.error && (
            <div className="text-destructive p-1 w-full">
              <p>{state?.fieldErrors?.end}</p>
            </div>
          )}
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
      {state?.error && (
        <div className="text-destructive p-1 w-full">
          <p>{state?.fieldErrors?.location}</p>
        </div>
      )}
      <input
        className={`w-full hover:bg-zinc-900 duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed p-2  border rounded-md`}
        type="submit"
        disabled={status.pending}
        value={status.pending ? "loading..." : "add"}
      />
    </form>
  );
}

export default ExperiencesForm;
