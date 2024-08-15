import Container from "../components/ui/containers/Container";
import Header from "../components/ui/nav/Header";
import { revalidatePath } from "next/cache";
import HeroLayout from "../components/ui/cards/HeroLayout";
import ExperienceCard from "../components/ui/cards/ExperienceCard";
import ProjectCard from "../components/ui/cards/ProjectCard";
import SkillCard from "../components/ui/cards/SkillCard";
import "../globals.css";

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
  const userInfo = await getUserInfo(userId);
  const {
    Bio,
    ExperiencesList,
    ContactsList,
    Layouts,
    ProjectsList,
    SkillsList,
  } = userInfo;
  const { bio, jobTitle, bioName, heroImage } = Bio[0];

  return (
    <div
      className="
     flex flex-col justify-start items-center gap-10 m-auto w-full max-w-full overflow-x-hidden overflow-y-auto no-scrollbar"
    >
      <Header userInfo={userInfo} />
      <Container className="w-full m-auto flex flex-col gap-8">
        <section id="hero" className="w-full h-full p-4 border">
          <HeroLayout
            name={bioName}
            summary={bio}
            jobTitle={jobTitle}
            img={heroImage}
            layoutStyle={Layouts[0].heroLayout}
          />
        </section>
        <section id="experiences" className="w-full min-h-full p-4 border">
          <div className="w-3/4 m-auto flex flex-col justify-center items-center gap-4">
            {ExperiencesList.length > 0 ? (
              <>
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
              </>
            ) : (
              <div>
                <h1>No Experiences</h1>
              </div>
            )}
          </div>
        </section>
        <section id="projects" className="w-full min-h-full p-4 border m-auto ">
          {ProjectsList.length > 0 ? (
            <div className="w-full m-auto grid-cols-4 grid gap-4">
              {ProjectsList.map((project) => {
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
          ) : (
            <div>
              <h1>No project added</h1>
            </div>
          )}
        </section>
        <section id="skills" className="w-full min-h-full p-4 border">
          {SkillsList.length > 0 ? (
            <div className="w-full flex justify-start items-center gap-8 grayscale-1 p-4 flex-wrap">
              {SkillsList.map((skill) => {
                return (
                  <SkillCard
                    key={skill.id}
                    skillLogo={skill.skillLogo}
                    skillName={skill.skillName}
                  />
                );
              })}
            </div>
          ) : (
            <div>
              <h1>No Skills Added</h1>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}

export default UserPage;
