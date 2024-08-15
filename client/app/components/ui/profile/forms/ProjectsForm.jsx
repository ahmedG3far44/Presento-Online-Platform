"use client";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useFormStatus } from "react-dom";
import { addProject } from "@/app/actions/create/actions";

function ProjectsForm({ project, setProject }) {
  const { toast } = useToast();
  const status = useFormStatus();
  const addProjectRef = useRef(null);

  const addProjectAction = async (formData) => {
    await addProject(formData);
    toast({
      title: "success added",
      description: "a new project was added successful",
    });
    addProjectRef.current?.reset();
  };
  return (
    <form
      ref={addProjectRef}
      action={addProjectAction}
      className="flex-1 h-96 max-h-96  rounded-md flex flex-col justify-start items-start gap-4 p-4 border"
    >
      <input
        type="text"
        className="w-full p-2 rounded-md "
        placeholder={`project name`}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
      />
      <input
        type="url"
        className="w-full p-2 rounded-md "
        placeholder={`project image url`}
        onChange={(e) => setProject({ ...project, thumbnail: e.target.value })}
      />
      <textarea
        type="text"
        placeholder="project description"
        className="p-2  rounded-md w-full h-[130px] "
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
      ></textarea>
      <input
        type="text"
        placeholder="live link url"
        className="p-2  rounded-md w-full"
        onChange={(e) => setProject({ ...project, liveLink: e.target.value })}
      />
      <input
        type="text"
        placeholder="source link"
        className="p-2  rounded-md w-full"
        onChange={(e) => setProject({ ...project, demoLink: e.target.value })}
      />
      <input
        type="submit"
        placeholder="source link"
        disabled={status.pending}
        className={`p-2 border  rounded-md w-full disabled:bg-zinc-600 disabled:cursor-not-allowed`}
        value={status.pending ? "adding..." : "Add"}
      />
    </form>
  );
}

export default ProjectsForm;
