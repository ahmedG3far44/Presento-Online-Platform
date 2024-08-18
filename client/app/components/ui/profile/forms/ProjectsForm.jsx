"use client";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useFormStatus } from "react-dom";
import { addProject } from "@/app/actions/create/actions";
import { FiFilePlus } from "react-icons/fi";

function ProjectsForm({ project, setProject }) {
  const { toast } = useToast();
  const status = useFormStatus();
  const addProjectRef = useRef(null);

  const addProjectAction = async (formData) => {
    await addProject(formData).then((res) => {
      toast({
        title: res.state,
        description: res.message,
      });
    });
    addProjectRef.current?.reset();
  };
  return (
    <form
      ref={addProjectRef}
      action={addProjectAction}
      className="flex-1 max-h-auto  rounded-md flex flex-col justify-start items-start gap-4 p-4 border"
    >
      <label
        className="w-full border-2 border-dashed bg-primary-foreground rounded-md p-4 flex flex-col justify-center items-center gap-4p"
        for="file-input"
      >
        <span className="text-muted-foreground">
          <FiFilePlus size={30} />
        </span>
        <h1 className="text-center w-1/2 p-2 text-muted-foreground">
          upload image, make sure the image type is JPEG, PNG, JPG less than
          (4MB)
        </h1>
      </label>
      <div className="flex flex-col justify-start items-start gap-2 w-full p-2">
        <h1>uploading...</h1>
        <div className="w-full h-2 bg-primary-foreground rounded-3xl ">
          <span className=" bg-muted-foreground block w-1/2 rounded-3xl duration-150  h-full"></span>
        </div>
      </div>
      <input
        type="file"
        id="file-input"
        accept="image/png, image/jpeg, image/jpg"
        style={{ display: "none" }}
        required
      />

      <input
        type="text"
        className="w-full p-2 rounded-md "
        placeholder={`project name`}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
        required
      />
      <input
        type="url"
        className="w-full p-2 rounded-md "
        placeholder={`project image url`}
        onChange={(e) => setProject({ ...project, thumbnail: e.target.value })}
        required
      />
      <textarea
        type="text"
        placeholder="project description"
        className="p-2  rounded-md w-full h-[130px] "
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
        required
      ></textarea>
      <input
        type="text"
        placeholder="live link url"
        className="p-2  rounded-md w-full"
        onChange={(e) => setProject({ ...project, liveLink: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="source link"
        className="p-2  rounded-md w-full"
        onChange={(e) => setProject({ ...project, demoLink: e.target.value })}
        required
      />
      <input
        type="submit"
        disabled={status.pending}
        className={`p-2 border hover:bg-zinc-500 duration-150 cursor-pointer  rounded-md w-full disabled:bg-zinc-600 disabled:cursor-not-allowed`}
        value={status.pending ? "adding..." : "Add"}
      />
    </form>
  );
}

export default ProjectsForm;
