"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectCard from "../../cards/ProjectCard";
import Image from "next/image";

function ProjectsForm() {
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
  const [projectList, setProjectList] = useState([
    {
      id: 1,
      title: "Project One 1224",
      thumbnail:
        "https://cdn.dribbble.com/userupload/15813490/file/original-fe8750451a2d04317cf2f4d351a3aa70.jpeg?resize=1024x768",
      description:
        "lorem project one description style for odm lorem project one description style for odm",
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
    },
    {
      id: 2,
      title: "Project two E-commerce",
      thumbnail:
        "https://cdn.dribbble.com/userupload/15817647/file/original-148b0f904dd23c082d18a2a09a9cbb58.jpg?resize=1024x760",
      description:
        "lorem project one description style for odm lorem project one description style for odm",
      tagsList: ["angular.js", "sass.js", "bootstrap", "svilt", "astro"],
      demoLink: "",
      liveLink: "",
    },
  ]);

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

      <div className="p-8 w-full ">
        <h1>Projects User List </h1>
        <ul className="mt-8 flex flex-col gap-2 w-full p-4 rounded-md">
          {projectList.map((project) => {
            return (
              <li
                key={project.id}
                className="flex justify-start gap-10 px-8  items-center py-4 border-b  w-full"
              >
                <div className="w-full flex justify-start items-center gap-4">
                  <Image
                    src={project.thumbnail}
                    width={40}
                    height={40}
                    className="rounded-md overflow-hidden"
                    alt="thumbnail project"
                  />
                  <h1>{project.title}</h1>
                </div>

                <div className="flex justify-center items-center gap-4 ml-auto">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUpdateState(true);
                      setProject({ ...project });
                    }}
                    className="px-2 py-1 rounded-md   disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={updateState}
                  >
                    {updateState ? "updating..." : "update"}
                  </Button>
                  {!updateState && (
                    <Button
                      variant="destructive"
                      className="px-2 py-1 rounded-md   "
                    >
                      delete
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ProjectsForm;
