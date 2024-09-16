import ItemsList from "@/app/components/ui/nav/ItemsList";
import ProjectsSection from "@/app/components/ui/sections/ProjectsSection";
import credentials from "@/app/credentials/credentials";

async function ProjectsPage() {
  const { user } = await credentials();
  const projectsList = await getProjectsList(user?.id);
  // console.log(user?.id, "project list");
  // console.log(projectsList, "project list");
  return (
    <div className="w-full max-w-full h-screen flex justify-start items-start gap-8 flex-col p-4">
      <ProjectsSection />
      <main className="w-full max-w-full h-full min-h-1/2">
        <ItemsList list={projectsList} sectionName={"projects"} />
      </main>
    </div>
  );
}
async function getProjectsList(userId) {
  try {
    const request = fetch(`http://localhost:4000/api/${userId}/project`);
    const data = request.then((res) => res.json());
    return data;
  } catch (error) {
    return {
      error: "fetch project lis error",
      message: error.message,
    };
  }
}
export default ProjectsPage;
