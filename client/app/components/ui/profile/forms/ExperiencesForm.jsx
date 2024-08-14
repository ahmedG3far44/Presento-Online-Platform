import { addExperience } from "@/app/actions/create/actions";
import ExperienceCard from "../../cards/ExperienceCard";
import ItemsList from "../../nav/ItemsList";
import SubmitBtn from "./SubmitBtn";
import credentials from "@/app/credentials/credentials";

async function ExperiencesForm() {
  const { user } = await credentials();
  const experiencesList = await getExperiencesList(user.id);
  return (
    <div className="w-full h-screen flex flex-col justify-start items-start px-8 gap-8">
      <div className="w-full flex justify-start items-start lg:flex-row-reverse p-4 gap-8 sm:flex-col">
        <section className="lg:w-3/4 max-lg:flex-col sm:w-full h-full  p-8 flex justify-center items-center border-2 border-dashed gap-8 rounded-md">
          <ExperienceCard
            cLogo={
              "https://images-platform.99static.com//Swv-bV_eHWTQEPuWvu34VSaq6Mc=/321x324:1605x1608/fit-in/500x500/99designs-contests-attachments/103/103739/attachment_103739439"
            }
            cName={"Company Name"}
            start={"2020, June"}
            end={"2022, May"}
            role={"your role in that company"}
            position={"Tech Lead"}
            location={"Cairo, Egypt"}
          />
        </section>
        <form
          action={addExperience}
          className="lg:w-1/3  sm:w-full flex flex-col justify-start items-start gap-2 p-4 rounded-md border"
        >
          <input
            className="p-2 w-full rounded-md "
            type="text"
            name="cName"
            placeholder="company name"
          />
          <input
            className="p-2 w-full rounded-md "
            type="url"
            name="cLogo"
            placeholder="company logo url"
          />
          <input
            className="p-2 w-full rounded-md"
            type="text"
            name="position"
            placeholder="your position or Job-title"
          />
          <textarea
            className="w-full  p-2 rounded-md"
            placeholder="my role "
            name="role"
            id="role"
          ></textarea>
          <div className="w-full flex justify-start items-start gap-4 mb-1 md:flex-wrap">
            <label className="w-full text-sm">
              Start Date
              <input
                className="p-2 w-full rounded-md "
                type="date"
                name="start"
                placeholder="start date"
              />
            </label>
            <label className="w-full text-sm ">
              End Date
              <input
                className="p-2 w-full rounded-md "
                type="date"
                name="end"
                placeholder="end date"
              />
            </label>
          </div>
          <input
            className="p-2 w-full rounded-md "
            type="text"
            name="location"
            placeholder="enter the job location"
          />
          <input
            type="submit"
            value={"add"}
            className="w-full py-2  rounded-md border hover:bg-zinc-800 disabled:bg-zinc-500 disabled:cursor-not-allowed cursor-pointer"
          />
        </form>
      </div>
      <main className="w-full m-auto ">
        <ItemsList list={experiencesList} sectionName={"experiences"} />
      </main>
    </div>
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

export default ExperiencesForm;
