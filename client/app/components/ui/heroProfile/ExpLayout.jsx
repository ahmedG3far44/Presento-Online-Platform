import { MdErrorOutline } from "react-icons/md";
import ExperienceCard from "../cards/ExperienceCard";
import ExperiencesLayoutWrapper from "../cards/experiencesLayouts/ExperiencesLayoutWrapper";
import { ChangeExperiencesLayoutForm } from "../profile/forms/LayoutsForm";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import { useParams } from "next/navigation";

function ExpLayout({ ExperiencesList, layouts, setLayouts, isLogged }) {
  const { userId } = useParams();
  return (
    <>
      {ExperiencesList?.length > 0 ? (
        <section id="experiences" className="w-full min-h-full p-4">
          {isLogged && (
            <ChangeExperiencesLayoutForm
              setLayouts={setLayouts}
              layouts={layouts}
            />
          )}
          <ExperiencesLayoutWrapper
            className={"p-4 gap-4 w-full"}
            experienceLayoutStyle={layouts?.expLayout}
          >
            {ExperiencesList?.map((exp) => {
              return (
                <ExperienceCard
                  id={exp.id}
                  key={exp.id}
                  cLogo={exp.cLogo}
                  cName={exp.cName}
                  start={exp.start}
                  layoutStyle={layouts?.expLayout}
                  end={exp.end}
                  role={exp.role}
                  position={exp.position}
                  location={exp.location}
                  userId={userId}
                />
              );
            })}
          </ExperiencesLayoutWrapper>
        </section>
      ) : (
        <>
          {isLogged ? (
            <div className="flex flex-col-reverse justify-center items-center gap-2 p-4 border rounded-md w-full ">
              <h2 className="text-muted-foreground flex gap-2 justify-center items-center">
                <MdErrorOutline size={15} />{" "}
                <span>no experiences added yet!!</span>
              </h2>
              <div className="w-40 h-40 border flex justify-center items-center rounded-md hover:bg-muted duration-150">
                <Link href={`/${userId}/profile/experiences`}>
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

export default ExpLayout;
