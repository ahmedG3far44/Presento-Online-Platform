"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SkillCard from "../../cards/SkillCard";

function SkillsForm() {
  const [updateState, setUpdateState] = useState(false);
  const [skillState, setSkills] = useState({
    skillName: "HTML5",
    skillLogo:
      "https://img.icons8.com/?size=100&id=20909&format=png&color=000000",
  });
  const [skillsList, setSkillsList] = useState([
    {
      skillName: "React.js",
      skillLogo:
        "https://img.icons8.com/?size=100&id=bzf0DqjXFHIW&format=png&color=000000",
    },
    {
      skillName: "TailwindCss",
      skillLogo:
        "https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000",
    },
    {
      skillName: "JavaScript",
      skillLogo:
        "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
    },
    {
      skillName: "Next.js",
      skillLogo:
        "https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000",
    },
    {
      skillName: "Github",
      skillLogo:
        "https://img.icons8.com/?size=100&id=118553&format=png&color=000000",
    },
  ]);

  return (
    <section className="w-full h-full flex flex-col  justify-start items-start mt-10  gap-4 p-4">
      <div className="w-full flex justify-center items-center gap-8 flex-row-reverse border-b  p-8 pb-12">
        <div className="w-1/2 min-h-full h-full  border-2 border-dashed  p-8 rounded-md">
          <SkillCard
            skillLogo={skillState.skillLogo}
            skillName={skillState.skillName}
          />
        </div>
        <form className="w-1/2 flex flex-col justify-start items-start gap-2 p-4 rounded-md border ">
          <input
            value={skillState.skillName}
            onChange={(e) =>
              setSkills({ ...skillState, skillName: e.target.value })
            }
            type="text"
            name="skill-name"
            className="w-full p-2   rounded-md"
            placeholder="enter skill name "
          />
          <input
            value={skillState.skillLogo}
            onChange={(e) =>
              setSkills({ ...skillState, skillLogo: e.target.value })
            }
            type="url"
            name="skill-logo"
            className="w-full p-2 rounded-md"
            placeholder="enter skill logo url  "
          />
          <Button
            variant="outline"
            disabled={false}
            className="w-full disabled:cursor-progress disabled:bg-gray-500"
          >
            Add Skill{" "}
          </Button>
        </form>
      </div>
      <div className="w-full mt-8">
        <h1>Skills List </h1>
        <ul className="mt-8 flex flex-col gap-2 w-full rounded-md">
          {skillsList.map((skill, index) => {
            return (
              <li
                key={index}
                className="flex justify-start gap-10  items-center px-8 py-4 border-b  w-full"
              >
                <div className="w-full flex justify-start items-center gap-4">
                  <Image
                    src={skill.skillLogo}
                    width={40}
                    height={40}
                    className="rounded-md overflow-hidden"
                    alt="thumbnail project"
                  />
                  <h1>{skill.skillName}</h1>
                </div>

                <div className="flex justify-center items-center gap-4 ml-auto">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUpdateState(true);
                      setSkills({ ...skill });
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

export default SkillsForm;
