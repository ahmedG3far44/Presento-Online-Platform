"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectCard from "../../cards/ProjectCard";
import ItemsList from "../../nav/ItemsList";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function ProjectsForm() {
  const { userId } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const [project, setProject] = useState({
    title: "",
    thumbnail: "",
    description: "",
    tagsList: [
      "next.js",
      "react.js",
      "tailwindCss",
      "css3",
      "html5",
      "UI & Ux",
    ],
    demoLink: "",
    liveLink: "",
  });
  const [updateState, setUpdateState] = useState(false);
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    getProjectsList(userId)
      .catch((error) =>
        toast({ title: "can't get projects list", description: error.message })
      )
      .then((projects) => {
        setProjectList(projects);
      });
    router.refresh("/");
  }, []);

  return (
    <section className="w-full flex flex-col justify-start items-start gap-8">
      <div className="w-full flex h-1/2  max-h-1/2 justify-start items-start gap-8 flex-row-reverse p-8">
        <div className="w-full  h-full max-h-full p-8 flex justify-center items-center border-2 border-dashed rounded-md">
          <ProjectCard
            title={project.title}
            thumbnail={project.thumbnail}
            description={project.description}
            demoLink={project.demoLink}
            liveLink={project.liveLink}
            tags={project.tagsList}
          />
        </div>
        <form className="w-1/2 h-full max-h-full rounded-md flex flex-col justify-start items-start gap-4 p-4 border">
          <input
            type="text"
            value={project.title}
            className="w-full p-2 rounded-md "
            placeholder={`project name`}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
          <input
            type="url"
            value={project.thumbnail}
            className="w-full p-2 rounded-md "
            placeholder={`project image url`}
            onChange={(e) =>
              setProject({ ...project, thumbnail: e.target.value })
            }
          />
          <textarea
            type="text"
            value={project.description}
            placeholder="project description"
            className="p-2  rounded-md w-full h-[130px] "
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          ></textarea>
          <input
            type="text"
            value={project.liveLink}
            placeholder="live link url"
            className="p-2  rounded-md w-full"
            onChange={(e) =>
              setProject({ ...project, liveLink: e.target.value })
            }
          />
          <input
            type="text"
            value={project.demoLink}
            placeholder="source link"
            className="p-2  rounded-md w-full"
            onChange={(e) =>
              setProject({ ...project, demoLink: e.target.value })
            }
          />
          <Button
            variant="outline"
            type="submit"
            onClick={() => setUpdateState(false)}
            placeholder="source link"
            className={`p-2  rounded-md w-full`}
          >
            {updateState ? "save changes" : "Add Product"}
          </Button>
        </form>
      </div>

      <main className="w-full p-8">
        <ItemsList
          list={projectList}
          updateState={updateState}
          setUpdateState={setUpdateState}
          sectionName={"projects"}
          setShowList={setProject}
        />
      </main>
    </section>
  );
}

function getProjectsList(userId) {
  try {
    const request = fetch(`http://localhost:4000/api/${userId}/project`);
    const data = request.then((res) => res.json());
    return data;
  } catch (error) {
    return {
      error: "fetch project lis error",
      message: error.message,
    };
  }
}

export default ProjectsForm;
