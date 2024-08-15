"use client";
import { useFormStatus } from "react-dom";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { addSkill } from "@/app/actions/create/actions";

function SkillsForm({ skillState, setSkill }) {
  const status = useFormStatus();
  const { toast } = useToast();
  const skillFormRef = useRef(null);
  const addNewSkillAction = async (formData) => {
    await addSkill(formData);
    toast({
      title: "created success",
      description: "a new skill was added success",
    });
    skillFormRef.current?.reset();
  };
  return (
    <form
      ref={skillFormRef}
      action={addNewSkillAction}
      className="w-1/2 flex flex-col justify-start items-start gap-2 p-4 rounded-md border "
    >
      <input
        value={skillState.skillName}
        onChange={(e) => setSkill({ ...skillState, skillName: e.target.value })}
        type="text"
        name="skillName"
        className="w-full p-2   rounded-md"
        placeholder="enter skill name "
      />
      <input
        value={skillState.skillLogo}
        onChange={(e) => setSkill({ ...skillState, skillLogo: e.target.value })}
        type="url"
        name="skillLogo"
        className="w-full p-2 rounded-md"
        placeholder="enter skill logo url"
      />
      <input
        type="submit"
        disabled={status.pending}
        value={status.pending ? "adding..." : "add"}
        className="w-full py-2  rounded-md border hover:bg-zinc-800 disabled:bg-zinc-500 disabled:cursor-not-allowed cursor-pointer"
      />
    </form>
  );
}
export default SkillsForm;
