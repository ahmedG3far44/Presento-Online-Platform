"use client";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { FiFilePlus } from "react-icons/fi";
import Loader from "@/app/components/loaders/Loader";

// import { addSkill } from "@/app/actions/create/actions";

function SkillsForm({ skillState, setSkill }) {
  const router = useRouter();
  const { userId } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const [progress, setProgress] = useState(0);
  const skillFormRef = useRef(null);
  // const addNewSkillAction = async (formData) => {
  //   await addSkill(formData);
  //   toast({
  //     title: "created success",
  //     description: "a new skill was added success",
  //   });
  //   skillFormRef.current?.reset();
  // };
  const handleAddNewSkill = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("file", skillState.skillLogo);
    formData.append("skillName", skillState.skillName);

    try {
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

      console.log(formData.get("skillName"));
      const request = await fetch(
        `http://localhost:4000/api/${userId}/skills`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (request.ok) {
        setProgress(100);
        setLoading(false);
        toast({
          title: "a new skill was added",
        });
        setErrorMessage(null);
        skillFormRef?.current.reset();
        router.refresh();
        return;
      }
    } catch (error) {
      setProgress(0);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "not added skill",
        description: error.message,
      });
      setErrorMessage(error.message);
    }
  };
  return (
    <form
      ref={skillFormRef}
      onSubmit={handleAddNewSkill}
      className="w-1/2 max-sm:w-full max-md:w-full flex flex-col justify-start items-start gap-2 p-4 rounded-md border "
    >
      <label
        className="w-full border-2 border-dashed bg-primary-foreground rounded-md p-4 flex flex-col justify-center items-center gap-4p"
        htmlFor="skillLogo"
      >
        <span className="text-muted-foreground">
          <FiFilePlus size={30} />
        </span>
        <h1 className="text-center text-sm w-3/4 max-sm:w-full max-md:w-full p-2 text-muted-foreground flex flex-col justify-center items-center gap-1">
          <span className="font-bold">upload your image here</span>{" "}
          <span className="w-full  text-sm font-normal max-sm:hidden max-md:hidden">
            make sure you upload image in these formats{" "}
          </span>{" "}
          <span className="font-normal">
            JPEG | PNG | JPG | GIF and max size (4MB)
          </span>
        </h1>
      </label>
      <input
        type="file"
        onChange={(e) =>
          setSkill({ ...skillState, skillLogo: e.target.files[0] })
        }
        id="skillLogo"
        name="skillLogo"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        style={{ display: "none" }}
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
              <span className={"w-full rounded-3xl bg-muted h-2 block "}>
                <progress
                  max="100"
                  id="skillLogo"
                  value="50"
                  className="block w-0 h-full rounded-3xl bg-purple-200 duration-150"
                ></progress>
              </span>
            </div>
          )}
        </>
      )}
      <input
        value={skillState.skillName}
        onChange={(e) => setSkill({ ...skillState, skillName: e.target.value })}
        type="text"
        readOnly={loading}
        name="skillName"
        className="w-full p-2 read-only:border-0 read-only:bg-gray-600   rounded-md"
        placeholder="enter skill name "
      />

      <input
        type="submit"
        disabled={loading}
        value={loading ? "adding..." : "add"}
        className="w-full py-2  rounded-md border hover:bg-zinc-800 disabled:bg-zinc-500 disabled:cursor-not-allowed cursor-pointer"
      />
    </form>
  );
}
export default SkillsForm;
