"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRef, useState } from "react";
import { experienceSchema } from "@/lib/schema";

import { useParams, useRouter } from "next/navigation";
import { FiFilePlus } from "react-icons/fi";
import Loader from "@/app/components/loaders/Loader";

function ExperiencesForm({ experiencesObject, setExperiencesObject }) {
  const { toast } = useToast();
  const { userId } = useParams();
  const router = useRouter();
  const experienceFormRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const [expCompanyLogo, setExpCompanyLogo] = useState();

  const handleAddExperience = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const result = experienceSchema.safeParse(experiencesObject);
    formData.append("file", expCompanyLogo);
    formData.append("cName", result?.data.cName);
    formData.append("start", result?.data.start);
    formData.append("end", result?.data.end);
    formData.append("location", result?.data.location);
    formData.append("role", result?.data.role);
    formData.append("position", result?.data.position);

    const file = formData.get("file");
    if (!file) {
      setLoading(false);
      setErrorMessage("not file found");
    }
    if (file.size >= 4194304) {
      setLoading(false);
      setErrorMessage(
        "the file that you uploaded is too large should be less than 4MB."
      );
    }
    const fileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if (!fileTypes.includes(file.type)) {
      setLoading(false);
      setErrorMessage(
        "unsupported type file, please upload file with these supported formats JPEG | PNG | JPG | GIF."
      );
    }

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      result.error.issues.map((error) => {
        setLoading(false);
        setErrorMessage("data fields that your entered are not correct");
        toast({
          variant: "destructive",
          title: "not valid inputs",
          description: error.message,
        });
      });
    } else {
      try {
        const request = await fetch(
          `http://localhost:4000/api/${userId}/experiences`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (request.status === 201) {
          setLoading(false);
          setErrorMessage(null);
          router.refresh();
          toast({
            title: `created success `,
            description: `your new experience in ${experiencesObject.cName} was added successful.`,
          });
          experienceFormRef?.current?.reset();
          return;
        } else {
          setLoading(false);
          toast({
            variant: "destructive",
            title: "adding error ",
            description: error.message,
          });
          setErrorMessage(error.message);
          return;
        }
      } catch (error) {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "adding error ",
          description: error.message,
        });
        setErrorMessage(error.message);
        return;
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <form
      ref={experienceFormRef}
      onSubmit={handleAddExperience}
      className="lg:flex-1 min-w-96 w-full sm:w-full flex flex-col justify-start items-start gap-2 p-4 rounded-md border"
    >
      <label
        className="w-full border-2 border-dashed bg-primary-foreground rounded-md p-4 flex flex-col justify-center items-center gap-4p"
        htmlFor="expLogo"
      >
        <span className="text-muted-foreground">
          <FiFilePlus size={30} />
        </span>
        <h1 className="text-center text-sm w-full p-2 text-muted-foreground flex flex-col justify-center items-center gap-1">
          <span className="font-bold">upload your image here</span>{" "}
          <span className="w-full  text-sm font-normal">
            supported Images formats JPEG | PNG | GIF | JPG, <br /> with max
            size (4MB)
          </span>{" "}
        </h1>
      </label>
      <input
        type="file"
        onChange={(e) => setExpCompanyLogo(e.target.files[0])}
        id="expLogo"
        name="expLogo"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        required
      />

      {error ? (
        <div className="p-2 rounded-md  text-start">
          <span className="text-red-500">{error}</span>
        </div>
      ) : (
        <>
          {loading && (
            <div
              className={
                "w-full my-4 flex flex-col justify-start items-start gap-2"
              }
            >
              <h1 className="flex gap-2 justify-center items-center">
                <Loader />
                <span>Uploading...</span>
              </h1>
            </div>
          )}
        </>
      )}
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
        required
      />
      <textarea
        className="w-full  p-2 rounded-md"
        placeholder="my role "
        minLength="10"
        maxLength="300"
        name="role"
        onChange={(e) =>
          setExperiencesObject({ ...experiencesObject, role: e.target.value })
        }
        required
      ></textarea>
      <div className="w-full flex justify-start items-start gap-4 mb-1 md:flex-wrap">
        <label className="w-full text-sm">
          Start Date
          <input
            className="p-2 w-full rounded-md "
            type="date"
            name="start"
            required
            onChange={(e) =>
              setExperiencesObject({
                ...experiencesObject,
                start: e.target.value,
              })
            }
          />
          {/* {state?.error && (
            <div className="text-destructive p-1 w-full">
              <p>{state?.fieldErrors?.start}</p>
            </div>
          )} */}
        </label>
        <label className="w-full text-sm ">
          End Date
          <input
            className="p-2 w-full rounded-md "
            type="date"
            name="end"
            required
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
        required
        placeholder="enter the job location"
        onChange={(e) =>
          setExperiencesObject({
            ...experiencesObject,
            location: e.target.value,
          })
        }
      />
      <input
        className={`w-full hover:bg-zinc-900 duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed p-2  border rounded-md`}
        type="submit"
        disabled={loading}
        value={loading ? "creating..." : "add"}
      />
    </form>
  );
}

export default ExperiencesForm;
