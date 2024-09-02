import Container from "../components/ui/containers/Container";
import Header from "../components/ui/nav/Header";
import { revalidatePath } from "next/cache";
import credentials from "../credentials/credentials";
import Footer from "../components/ui/sections/Footer";
import MainProfilePreviewSection from "../components/ui/heroProfile/MainProfilePreviewSection";
import "../globals.css";
import layout from "./dashboard/layout";

const getUserLayouts = async (userId) => {
  try {
    const request = await fetch(`http://localhost:4000/api/${userId}/layouts`);
    const data = request.json();
    revalidatePath(`/${userId}`);
    return data;
  } catch (error) {
    return error.message;
  }
};

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

async function UserPage({ params }) {
  const { userId } = params;
  const { isLogged } = await credentials();
  const userInfo = await getUserInfo(userId);
  const layouts = await getUserLayouts(userId);
  const { bio, ExperiencesList, ProjectsList, SkillsList, contacts } = userInfo;

  return (
    <div
      className="
     flex flex-col justify-start items-center gap-10 m-auto w-full max-w-full overflow-x-hidden overflow-y-auto no-scrollbar"
    >
      <Header userInfo={userInfo} />
      <Container className="w-full m-auto flex flex-col gap-8">
        <MainProfilePreviewSection
          layouts={layouts}
          ExperiencesList={ExperiencesList}
          ProjectsList={ProjectsList}
          SkillsList={SkillsList}
          bio={bio}
          contacts={contacts}
          isLogged={isLogged}
        />
      </Container>
      <Footer userInfo={userInfo} />
    </div>
  );
}

export default UserPage;
