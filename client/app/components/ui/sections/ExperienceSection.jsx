"use client";
import { useState } from "react";
import ExperiencesForm from "../profile/forms/ExperiencesForm";
import ExperienceCard from "../cards/ExperienceCard";

function ExperienceSection() {
  const [experiencesObject, setExperiencesObject] = useState({
    cName: "company name",
    cLogo: "",
    position: "position || job title",
    start: "2023-09-09",
    end: "2024-01-01",
    role: "your roles and duties in this company",
    location: "location of work",
  });
  return (
    <div className="w-full flex justify-start items-center flex-wrap-reverse gap-8 max-md:flex-col-reverse max-sm:flex-col-reverse">
      <ExperiencesForm
        experiencesObject={experiencesObject}
        setExperiencesObject={setExperiencesObject}
      />
      <div className="flex-1 max-sm:w-full max-md:w-full h-full min-h-full p-8 flex justify-center items-center border-2 border-dashed gap-8 rounded-md">
        <ExperienceCard
          cLogo={experiencesObject.cLogo}
          cName={experiencesObject.cName || "company name"}
          start={experiencesObject.start || "2022"}
          end={experiencesObject.end || "2022"}
          role={experiencesObject.role || "your role in this company"}
          position={experiencesObject.position || "your position"}
          location={experiencesObject.location || "company location"}
          layoutStyle={"1"}
        />
      </div>
    </div>
  );
}

export default ExperienceSection;
