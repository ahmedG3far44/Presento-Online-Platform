"use client";
import SkillCard from "../../cards/SkillCard";
import ItemsList from "../../nav/ItemsList";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addSkill } from "@/app/actions/create/actions";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";

function SkillsForm() {
  const { userId } = useParams();
  const router = useRouter();
  const data = useFormStatus();
  const { toast } = useToast();
  const [skillState, setSkills] = useState({
    skillName: "HTML5",
    skillLogo:
      "https://img.icons8.com/?size=100&id=20909&format=png&color=000000",
  });
  const [skillsList, setSkillsList] = useState([]);
  useEffect(() => {
    getUserSkills(userId).then((skillsList) => {
      setSkillsList(skillsList);
    });
  }, []);
  function action(formData) {
    addSkill(formData);
    toast({
      title: "success action",
      description: "a new skill was added success",
    });
  }

  return (
    <section className="w-full h-full flex flex-col  justify-start items-start mt-10  gap-4 p-4">
      <div className="w-full flex justify-center items-center gap-8 flex-row-reverse border-b  p-8 pb-12">
        <div className="w-1/2 min-h-full h-full  border-2 border-dashed  p-8 rounded-md">
          <SkillCard
            skillLogo={skillState.skillLogo}
            skillName={skillState.skillName}
          />
        </div>
        <form
          action={action}
          className="w-1/2 flex flex-col justify-start items-start gap-2 p-4 rounded-md border "
        >
          <input
            value={skillState.skillName}
            onChange={(e) =>
              setSkills({ ...skillState, skillName: e.target.value })
            }
            type="text"
            name="skillName"
            className="w-full p-2   rounded-md"
            placeholder="enter skill name "
          />
          <input
            value={skillState.skillLogo}
            onChange={(e) =>
              setSkills({ ...skillState, skillLogo: e.target.value })
            }
            type="url"
            name="skillLogo"
            className="w-full p-2 rounded-md"
            placeholder="enter skill logo url"
          />
          <input
            type="submit"
            value={data.pending ? "adding..." : "add"}
            className="w-full py-2  rounded-md border hover:bg-zinc-800 disabled:bg-zinc-500 disabled:cursor-not-allowed cursor-pointer"
          />
        </form>
      </div>
      <main className="w-full p-8 mt-8">
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

export default SkillsForm;
