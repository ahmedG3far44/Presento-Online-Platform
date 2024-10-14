"use client";
import { useState, useRef } from "react";
import { LuImage } from "react-icons/lu";
import { PiImagesSquare } from "react-icons/pi";
import { Plus } from "lucide-react";
import Loader from "@/app/components/loaders/Loader";
import { useToast } from "@/components/ui/use-toast";
import { addProject } from "@/app/actions/create/actions";

function ProjectsForm({ project, setProject }) {
  const { toast } = useToast();
  const addProjectRef = useRef(null);
  const tagRef = useRef(null);
  const [error, setErrorMessage] = useState(null);
  const [pending, setPending] = useState(false);
  const [successMessage, setSuccessAddMessage] = useState(null);
  const [tag, setTag] = useState("");
  const [tagList, setTagsList] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");

  // const addProjectAction = async (formData) => {
  //   let results = await addProject(formData, tagList);
  //   setPending(true);

  //   console.log(pending);
  //   if (results.success !== true) {
  //     // error
  //     setErrorMessage(results?.message);
  //     setPending(false);
  //     toast({
  //       variant: "destructive",
  //       title: "can't create a new project",
  //       description: results?.message,
  //     });
  //   } else {
  //     // success
  //     // setErrorMessage("");
  //     setSuccessAddMessage(results?.message);
  //     toast({
  //       title: "success added",
  //       description: results?.message,
  //     });
  //     setTimeout(() => {
  //       setSuccessAddMessage("");
  //     }, 1000);
  //     setPending(false);
  //     setTagsList([]);
  //     addProjectRef.current?.reset();
  //   }
  // };
  return (
    <form
      ref={addProjectRef}
      action={async (formData) => {
        setPending(true);
        await addProject(formData, tagList)
          .then((response) => {
            console.log(response.success);
            console.log(response.message);
            setPending(false);
          })
          .catch((error) => {
            console.log(error.message);
            setPending(false);
          });
      }}
      className="bg-card flex-1 max-h-auto  rounded-md flex flex-col justify-start items-start gap-2 p-4 border"
    >
      <label
        className="cursor-pointer hover:bg-secondary duration-150 w-full border-2 border-dashed bg-primary-foreground rounded-md p-4 flex flex-col justify-center items-center gap-4p"
        htmlFor="thumbnail"
      >
        <span className="text-muted-foreground">
          <LuImage size={20} />
        </span>
        <p className="text-center text-sm w-3/4 m-auto p-2 text-muted-foreground">
          upload project thumbnail here, <br /> supported formats JPG | PNG |
          JPEG | GIF
        </p>
      </label>

      <input
        id="thumbnail"
        type="file"
        accept="image/png, image/jpeg, image/jpg,  image/gif"
        name="thumbnail"
        className={thumbnail ? "input" : "hidden"}
        onChange={(e) => setThumbnail(e.target.files[0])}
      />
      <label
        className="cursor-pointer hover:bg-secondary duration-150 w-full border-2 border-dashed bg-primary-foreground rounded-md p-4 flex flex-col justify-center items-center gap-4p"
        htmlFor="images"
      >
        <span className="text-muted-foreground">
          <PiImagesSquare size={20} />
        </span>
        <p className="text-center text-sm w-3/4 m-auto p-2 text-muted-foreground">
          upload other images here, <br /> supported formats JPG | PNG | JPEG |
          GIF
        </p>
      </label>
      <input
        type="file"
        id="images"
        name="images"
        accept="image/png, image/jpeg, image/jpg,  image/gif"
        className={!!projectImages.length ? "input" : "hidden"}
        onChange={(e) => setProjectImages([...e.target.files])}
        multiple
      />

      {pending && (
        <div className="flex justify-start items-center gap-2 w-full p-2 bg-secondary rounded-md">
          <Loader />
          <h1>uploading...</h1>
        </div>
      )}
      <input
        type="text"
        name="title"
        className="input"
        placeholder={`project name`}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
      />

      <div className="w-full flex justify-between items-center gap-4">
        <input
          type="text"
          name="tags"
          value={tag}
          className="input"
          placeholder="enter your tags "
          ref={tagRef}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          type="button"
          onClick={(e) => {
            setTagsList([...tagList, tag]);
            setTag("");
          }}
          className={
            "!w-1/4 !text-center submit_button flex justify-center items-center gap-2"
          }
        >
          <span>
            <Plus size={20} />
          </span>{" "}
          <span>tag</span>
        </button>
      </div>
      <div className="flex justify-start items-center gap-2 flex-wrap">
        {tagList.length > 0 &&
          tagList.map((tag, index) => {
            return (
              <div key={index}>
                {tag !== "" && (
                  <h1 className="my-2 px-4 rounded-3xl border bg-secondary ">
                    #{tag}
                  </h1>
                )}
              </div>
            );
          })}
      </div>

      <textarea
        type="text"
        placeholder="enter your project description here..."
        name="description"
        className="input h-[130px] "
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
      ></textarea>

      <input
        type="text"
        placeholder="enter your project source link here..."
        className="input"
        name="sourceLink"
        onChange={(e) => setProject({ ...project, demoLink: e.target.value })}
      />
      {successMessage && (
        <div className="success_message">{successMessage}</div>
      )}
      {error && <div className="error_message">{error}</div>}
      <input
        type="submit"
        disabled={pending}
        value={pending ? "creating..." : "Add"}
        className="submit_button"
      />
    </form>
  );
}

export default ProjectsForm;
