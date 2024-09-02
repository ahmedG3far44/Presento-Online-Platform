"use client";
import { useState } from "react";
import Hero from "./Hero";
import ExpLayout from "./ExpLayout";
import ProjectsLayout from "./ProjectsLayout";
import SkillsLayout from "./SkillsLayout";

function MainProfilePreviewSection({
  layouts,
  ExperiencesList,
  ProjectsList,
  SkillsList,
  contacts,
  bio,
  isLogged,
}) {
  //   const initialLayout = JSON.parse(JSON.stringify(layouts));
  const [layoutStyle, setLayouts] = useState(layouts);

  return (
    <>
      <Hero
        bio={bio}
        layouts={layoutStyle}
        setLayouts={setLayouts}
        contacts={contacts}
        isLogged={isLogged}
      />
      <ExpLayout
        layouts={layoutStyle}
        setLayouts={setLayouts}
        ExperiencesList={ExperiencesList}
        isLogged={isLogged}
      />
      <ProjectsLayout
        layouts={layoutStyle}
        setLayouts={setLayouts}
        ProjectsList={ProjectsList}
        isLogged={isLogged}
      />
      <SkillsLayout
        layouts={layoutStyle}
        setLayouts={setLayouts}
        SkillsList={SkillsList}
        isLogged={isLogged}
      />
    </>
  );
}

export default MainProfilePreviewSection;
