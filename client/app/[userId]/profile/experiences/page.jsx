import ItemsList from "@/app/components/ui/nav/ItemsList";
import ExperienceSection from "@/app/components/ui/sections/ExperienceSection";
import credentials from "@/app/credentials/credentials";

async function ExperiencesPage() {
  const { user } = await credentials();
  const experiencesList = await getExperiencesList(user.id);
  return (
    <section className="w-full h-screen flex flex-col justify-start items-start px-8 gap-8 sticky top-0 right-0 overflow-x-hidden overflow-y-auto no-scrollbar p-4">
      <ExperienceSection />
      <main className="w-full m-auto overflow-x-hidden overflow-y-auto no-scrollbar">
        <ItemsList list={experiencesList} sectionName={"experiences"} />
      </main>
    </section>
  );
}
async function getExperiencesList(userId) {
  try {
    const request = await fetch(
      `http://localhost:4000/api/${userId}/experiences`
    );
    const data = request.json();
    return data;
  } catch (error) {
    return {
      error: "can't get experiences list",
      message: error.message,
    };
  }
}
export default ExperiencesPage;
