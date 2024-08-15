"use client";
import { useState } from "react";
import SkillsForm from "../profile/forms/SkillsForm";
import SkillCard from "../cards/SkillCard";

function SkillsSection() {
  const [skillState, setSkill] = useState({
    skillName: "skill Name",
    skillLogo:
      "https://img.icons8.com/?size=100&id=20909&format=png&color=000000",
  });
  return (
    <section className="w-full flex justify-start items-center gap-8">
      <SkillsForm skillState={skillState} setSkill={setSkill} />
      <div className="p-4 border-2 border-dashed rounded-md flex justify-center items-center w-1/2 h-full">
        <SkillCard
          skillLogo={skillState.skillLogo}
          skillName={skillState.skillName}
        />
      </div>
    </section>
  );
}

export default SkillsSection;
