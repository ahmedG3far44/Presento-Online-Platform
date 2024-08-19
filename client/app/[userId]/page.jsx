import Container from "../components/ui/containers/Container";
import Header from "../components/ui/nav/Header";
import { revalidatePath } from "next/cache";
import HeroLayout from "../components/ui/cards/HeroLayout";
import ExperienceCard from "../components/ui/cards/ExperienceCard";
import ProjectCard from "../components/ui/cards/ProjectCard";
import SkillCard from "../components/ui/cards/SkillCard";
import "../globals.css";
import credentials from "../credentials/credentials";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";

const getUserInfo = async (userId) => {
  try {
    const request = await fetch(`http://localhost:4000/api/${userId}/user`);
    const data = request.json();
    revalidatePath(`/${userId}`);
    return data;
  } catch (error) {
    return error.message;
  }
};
// const getExperiencesList = async (userId) => {
//   try {
//     const request = await fetch(
//       `http://localhost:4000/api/${userId}/experiences`
//     );
//     const data = request.json();
//     revalidatePath(`/${userId}`);
//     return data;
//   } catch (error) {
//     return error.message;
//   }
// };
async function UserPage({ params }) {
  const { userId } = params;
  const { isLogged } = await credentials();
  const userInfo = await getUserInfo(userId);
  const {
    bio,
    ExperiencesList,
    createdAt,
    Layouts,
    ProjectsList,
    SkillsList,
    contacts,
  } = userInfo;

  return (
    <div
      className="
     flex flex-col justify-start items-center gap-10 m-auto w-full max-w-full overflow-x-hidden overflow-y-auto no-scrollbar"
    >
      <Header userInfo={userInfo} />
      <Container className="w-full m-auto flex flex-col gap-8">
        <section id="hero" className="w-full h-full p-4 border">
          <HeroLayout
            name={bio?.bioName}
            summary={bio?.bio}
            jobTitle={bio?.jobTitle}
            img={bio?.heroImage}
            layoutStyle={bio?.layoutStyle}
            contacts={contacts}
            edit={"preview"}
          />
        </section>
        <>
          {ExperiencesList?.length > 0 ? (
            <section id="experiences" className="w-full min-h-full p-4 border">
              <div className="w-3/4 m-auto flex flex-col justify-center items-center gap-4">
                {ExperiencesList?.map((exp) => {
                  return (
                    <ExperienceCard
                      id={exp.id}
                      key={exp.id}
                      cLogo={exp.cLogo}
                      cName={exp.cName}
                      start={exp.start}
                      end={exp.end}
                      role={exp.role}
                      position={exp.position}
                      location={exp.location}
                      userId={exp.usersId}
                    />
                  );
                })}
              </div>
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
        <>
          {ProjectsList?.length > 0 ? (
            <section
              id="projects"
              className="w-full min-h-full p-4 border m-auto "
            >
              <div className="w-full m-auto grid-cols-4 grid gap-4">
                {ProjectsList?.map((project) => {
                  return (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      title={project.title}
                      thumbnail={project.thumbnail}
                      description={project.description}
                      views={project.views}
                      likes={project.likes}
                      userId={userId}
                    />
                  );
                })}
              </div>
            </section>
          ) : (
            <>
              {isLogged ? (
                <div className="w-full p-4 flex flex-col-reverse justify-center items-center rounded-md border gap-2">
                  <h2 className="text-muted-foreground flex gap-2 justify-center items-center">
                    <MdErrorOutline size={15} />{" "}
                    <span>no projects added yet!!</span>
                  </h2>
                  <div className="w-40 h-40 border flex justify-center items-center rounded-md hover:bg-muted duration-150">
                    <Link href={`/${userId}/profile/projects`}>
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
        <>
          {SkillsList?.length > 0 ? (
            <section id="skills" className="w-full min-h-full p-4 border">
              <div className="w-full flex justify-start items-center gap-8 grayscale-1 p-4 flex-wrap">
                {SkillsList?.map((skill) => {
                  return (
                    <SkillCard
                      key={skill.id}
                      skillLogo={skill.skillLogo}
                      skillName={skill.skillName}
                    />
                  );
                })}
              </div>
            </section>
          ) : (
            <>
              {isLogged ? (
                <div className="w-full p-4 rounded-md border flex flex-col-reverse justify-center items-start gap-2">
                  <h2 className="text-muted-foreground flex gap-2 justify-center items-center">
                    <MdErrorOutline size={15} />{" "}
                    <span>no skills added yet!!</span>
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
      </Container>
    </div>
  );
}

export default UserPage;
