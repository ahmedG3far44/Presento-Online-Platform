import ItemsList from "@/app/components/ui/nav/ItemsList";
import SkillsSection from "@/app/components/ui/sections/SkillsSection";

async function ProfileSkillsPage({ params }) {
  const { userId } = params;
  const skillsList = await getUserSkills(userId);
  return (
    <section className="w-full max-w-full overflow-x-hidden overflow-y-scroll flex flex-col h-screen   items-start gap-20 p-8">
      <SkillsSection />
      <main className="w-full max-w-full overflow-hidden overflow-y-scroll no-scrollbar">
        <ItemsList list={skillsList} sectionName={"skills"} />
      </main>
    </section>
  );
}

async function getUserSkills(userId) {
  try {
    const request = await fetch(`http://localhost:4000/api/${userId}/skills`);
    const data = request.json();
    return data;
  } catch (error) {
    return {
      error: "can't get user skills",
      message: error.message,
    };
  }
}

export default ProfileSkillsPage;
