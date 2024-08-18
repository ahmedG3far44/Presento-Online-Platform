"use client";
import { useState } from "react";
import ProjectsForm from "../profile/forms/ProjectsForm";
import ProjectCard from "../cards/ProjectCard";
import ItemsList from "../nav/ItemsList";

function ProjectsSection() {
  const [project, setProject] = useState({
    title: "",
    thumbnail: "",
    Images: [""],
    tags: [""],
    description: "",
    views: 0,
    likes: 0,
    liveLink: "",
  });
  return (
    <section className="w-full flex justify-start items-center gap-8 max-h-1/2">
      <ProjectsForm project={project} setProject={setProject} />
      <div className="flex-1 flex-col border-2 h-full border-dashed rounded-md flex justify-center items-center">
        <ProjectCard
          id={project.id}
          title={project.title}
          thumbnail={project.thumbnail}
          description={project.description}
          views={project.views}
          likes={project.likes}
          state={"preview"}
        />
      </div>
    </section>
  );
}

export default ProjectsSection;
