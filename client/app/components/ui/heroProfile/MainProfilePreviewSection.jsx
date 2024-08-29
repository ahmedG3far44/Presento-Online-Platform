"use client";
import { useState } from "react";
import Hero from "./Hero";
import ExpLayout from "./ExpLayout";
import ProjectsLayout from "./ProjectsLayout";
import SkillsLayout from "./SkillsLayout";

function MainProfilePreviewSection({
  isLogged,
  layouts,
  ExperiencesList,
  ProjectsList,
  SkillsList,
  contacts,
  layoutsID,
  bio,
  userId,
}) {
  //   const initialLayout = JSON.parse(JSON.stringify(layouts));
  const [layoutStyle, setLayouts] = useState(layouts);

  return (
    <>
      <Hero bio={bio} contacts={contacts} />
      <ExpLayout
        layouts={layoutStyle}
        layoutsID={layoutsID}
        setLayouts={setLayouts}
        ExperiencesList={ExperiencesList}
        isLogged={isLogged}
        userId={userId}
      />
      <ProjectsLayout
        layoutsID={layoutsID}
        layouts={layoutStyle}
        setLayouts={setLayouts}
        userId={userId}
        ProjectsList={ProjectsList}
        isLogged={isLogged}
      />
      <SkillsLayout
        layoutsID={layoutsID}
        layouts={layoutStyle}
        setLayouts={setLayouts}
        SkillsList={SkillsList}
        isLogged={isLogged}
      />
    </>
  );
}

export default MainProfilePreviewSection;
