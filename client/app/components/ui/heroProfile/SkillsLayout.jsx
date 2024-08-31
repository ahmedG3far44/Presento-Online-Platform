import { MdErrorOutline } from "react-icons/md";
import SkillCard from "../cards/SkillCard";
import SkillLayoutsWrapper from "../cards/skillsLayouts/SkillLayoutsWrapper";
import { ChangeSkillsLayoutForm } from "../profile/forms/LayoutsForm";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

function SkillsLayout({
  SkillsList,
  isLogged,
  layouts,
  userId,
  setLayouts,
  layoutsID,
}) {
  return (
    <>
      {SkillsList?.length > 0 ? (
        <section id="skills" className="w-full min-h-full p-4 border">
          {isLogged && (
            <ChangeSkillsLayoutForm
              layoutsID={layoutsID}
              setLayouts={setLayouts}
              layouts={layouts}
            />
          )}
          <SkillLayoutsWrapper skillLayoutStyle={layouts?.skillsLayout}>
            {SkillsList?.map((skill) => {
              return (
                <SkillCard
                  key={skill?.id}
                  layoutStyle={layouts?.skillsLayout}
                  skillLogo={skill?.skillLogo}
                  skillName={skill?.skillName}
                />
              );
            })}
          </SkillLayoutsWrapper>
        </section>
      ) : (
        <>
          {isLogged ? (
            <div className="w-full p-4 rounded-md border flex flex-col-reverse justify-center items-center gap-2">
              <h2 className="text-muted-foreground flex gap-2 justify-center items-center">
                <MdErrorOutline size={15} /> <span>no skills added yet!!</span>
              </h2>
              <div className="w-40 h-40 border flex justify-center items-center rounded-md hover:bg-muted duration-150">
                <Link href={`/${userId}/profile/skills`}>
                  <span>
                    <LuPlus size={50} />
                  </span>
                </Link>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default SkillsLayout;
