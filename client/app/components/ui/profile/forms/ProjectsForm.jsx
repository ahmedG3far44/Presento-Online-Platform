"use client";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { addProject } from "@/app/actions/create/actions";
import { FiFilePlus } from "react-icons/fi";
import { useState } from "react";

function ProjectsForm({ project, setProject }) {
  const { toast } = useToast();
  const addProjectRef = useRef(null);
  const tagRef = useRef(null);
  const [pending, setPending] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const [successMessage, setSuccessAddMessage] = useState(null);
  const [tag, setTag] = useState("");
  const [tagList, setTagsList] = useState([]);

  const addProjectAction = async (formData) => {
    setPending(true);
    await addProject(formData, tagList)
      .then((res) => {
        setSuccessAddMessage("your added project success");
        toast({
          title: "success added",
          description: res?.message,
        });
        setTimeout(setSuccessAddMessage(null), 1000);
        setTagsList([]);
        addProjectRef.current?.reset();
        setPending(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setPending(false);
        toast({
          variant: "destructive",
          title: error.error,
          description: error.message,
        });
      });
  };
  return (
    <form
      ref={addProjectRef}
      action={addProjectAction}
      className="flex-1 max-h-auto  rounded-md flex flex-col justify-start items-start gap-4 p-4 border"
    >
      {error && <div className="error_message">{error}</div>}
      <label
        className="w-full border-2 border-dashed bg-primary-foreground rounded-md p-4 flex flex-col justify-center items-center gap-4p"
        htmlFor="file-input"
      >
        <span className="text-muted-foreground">
          <FiFilePlus size={30} />
        </span>
        <h1 className="text-center w-1/2 p-2 text-muted-foreground">
          upload image, make sure the image type is JPEG, PNG, JPG less than
          (4MB)
        </h1>
      </label>
      {pending && (
        <div className="flex justify-start items-center gap-2 w-full p-2">
          <span className="w-4 h-4 rounded-full bg-transparent border-r-0 border-t-0 border-l-2 border-b-2 border-primary animate-spin"></span>{" "}
          <h1>uploading...</h1>
        </div>
      )}

      <input
        type="file"
        className="w-full p-2 rounded-md "
        accept="image/png, image/jpeg, image/jpg,  image/gif"
        name="thumbnail"
      />
      <input
        type="file"
        id="file-input"
        name="images"
        accept="image/png, image/jpeg, image/jpg,  image/gif"
        style={{ display: "none" }}
        multiple
      />

      <input
        type="text"
        name="title"
        className="w-full p-2 rounded-md "
        placeholder={`project name`}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
      />

      <div className="w-full flex justify-between items-center gap-4">
        <input
          type="text"
          name="tags"
          value={tag}
          className="w-full p-2 rounded-md "
          placeholder="enter your tags "
          ref={tagRef}
          onChange={(e) => setTag(e.target.value)}
        />
        <span
          onClick={(e) => {
            setTagsList([...tagList, tag]);
            setTag("");
          }}
          className={
            "w-1/5 px-4 py-2 border border-transparent hover:border-primary rounded-md bg-primary-foreground cursor-pointer"
          }
        >
          Add Tag
        </span>
      </div>
      <div className="flex justify-start items-center gap-2 flex-wrap">
        {tagList.length > 0 &&
          tagList.map((tag, index) => {
            return (
              <h1 className="px-4 rounded-3xl border " key={index}>
                #{tag}
              </h1>
            );
          })}
      </div>

      <textarea
        type="text"
        placeholder="project description"
        name="description"
        className="p-2  rounded-md w-full h-[130px] "
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
      ></textarea>

      <input
        type="text"
        placeholder="source link"
        className="p-2  rounded-md w-full"
        name="sourceLink"
        onChange={(e) => setProject({ ...project, demoLink: e.target.value })}
      />
      {successMessage && (
        <div className="success_message">{successMessage}</div>
      )}
      <input
        type="submit"
        disabled={pending}
        value={pending ? "adding..." : "Add"}
        className="submit_button"
      />
    </form>
  );
}

export default ProjectsForm;
