"use client";

import { useToast } from "@/components/ui/use-toast";
import { useFormStatus } from "react-dom";
import { updateLayoutsAction } from "@/app/actions/update/actions";

export function ChangeExperiencesLayoutForm({
  layouts,
  setLayouts,
  layoutsID,
}) {
  const { toast } = useToast();
  const { pending } = useFormStatus();

  return (
    <form
      action={async () => {
        await updateLayoutsAction(layouts, layoutsID)
          .then((data) => {
            console.log(data);
            toast({
              title: "experiences layouts was changed",
            });
          })
          .catch((error) => {
            toast({
              variants: "destructive",
              title: error.message,
              description: "not updated layouts",
            });
          });
      }}
      className={
        "w-full max-w-full flex justify-start items-center gap-2 flex-wrap p-4"
      }
    >
      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="expLayout-1"
          name={"expLayout"}
          value="1"
          onChange={(e) =>
            setLayouts({ ...layouts, expLayout: e.target.value })
          }
        />
        <label htmlFor="expLayout-1">Exp 1</label>
      </div>

      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="expLayout-2"
          name={"expLayout"}
          value="2"
          onChange={(e) =>
            setLayouts({ ...layouts, expLayout: e.target.value })
          }
        />
        <label htmlFor="expLayout-2">Exp 2</label>
      </div>

      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="expLayout-3"
          name={"expLayout"}
          value="3"
          onChange={(e) =>
            setLayouts({ ...layouts, expLayout: e.target.value })
          }
        />
        <label htmlFor="expLayout-3">Exp 3</label>
      </div>
      <input
        disabled={pending}
        className="px-4 py-2 border disabled:bg-green-500 rounded-md  cursor-pointer hover:bg-primary-foreground duration-150"
        type="submit"
        value={pending ? "saving..." : "save changes"}
      />
    </form>
  );
}
export function ChangeProjectsLayoutForm({ layouts, setLayouts, layoutsID }) {
  const { toast } = useToast();
  const { pending } = useFormStatus();
  return (
    <form
      action={async () => {
        await updateLayoutsAction(layouts, layoutsID);
        toast({
          title: "projects layout was changed !!",
        });
      }}
      className={
        "w-full max-w-full flex justify-start items-center gap-2 flex-wrap p-4"
      }
    >
      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="project-1"
          name={"projectsLayouts"}
          value="1"
          onChange={(e) =>
            setLayouts({ ...layouts, projectsLayout: e.target.value })
          }
        />
        <label htmlFor="project-1">Project 1</label>
      </div>
      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="project-2"
          name={"projectsLayouts"}
          value="2"
          onChange={(e) =>
            setLayouts({ ...layouts, projectsLayout: e.target.value })
          }
        />
        <label htmlFor="project-2">Project 2</label>
      </div>
      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="project-3"
          name={"projectsLayouts"}
          value="3"
          onChange={(e) =>
            setLayouts({ ...layouts, projectsLayout: e.target.value })
          }
        />
        <label htmlFor="project-3">Project 3</label>
      </div>
      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="project-4"
          name={"projectsLayouts"}
          value="4"
          onChange={(e) =>
            setLayouts({ ...layouts, projectsLayout: e.target.value })
          }
        />
        <label htmlFor="project-4">Project 4</label>
      </div>
      <input
        disabled={pending}
        className="px-4 py-2 border disabled:bg-green-500 rounded-md cursor-pointer hover:bg-primary-foreground duration-150"
        type="submit"
        value={pending ? "saving..." : "save changes"}
      />
    </form>
  );
}

export function ChangeSkillsLayoutForm({ layouts, setLayouts, layoutsID }) {
  const { toast } = useToast();
  const { pending } = useFormStatus();
  return (
    <form
      action={async () => {
        await updateLayoutsAction(layouts, layoutsID);
        toast({
          title: "skills layout was changed !!",
        });
      }}
      className={
        "w-full max-w-full flex justify-start items-center gap-2 flex-wrap p-4"
      }
    >
      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="skillsLayouts-1"
          name={"skillsLayouts"}
          value="1"
          onChange={(e) =>
            setLayouts({ ...layouts, skillsLayout: e.target.value })
          }
        />
        <label htmlFor="skillsLayouts-1">skills 1</label>
      </div>

      <div className="p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150">
        <input
          type="radio"
          id="skillsLayouts-2"
          name={"skillsLayouts"}
          value="2"
          onChange={(e) =>
            setLayouts({ ...layouts, skillsLayout: e.target.value })
          }
        />
        <label htmlFor="skillsLayouts-2">skills 2</label>
      </div>

      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="skillsLayouts-3"
          name={"skillsLayouts"}
          value="3"
          onChange={(e) =>
            setLayouts({ ...layouts, skillsLayout: e.target.value })
          }
        />
        <label htmlFor="skillsLayouts-3">skills 3</label>
      </div>
      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="skillsLayouts-4"
          name={"skillsLayouts"}
          value="4"
          onChange={(e) =>
            setLayouts({ ...layouts, skillsLayout: e.target.value })
          }
        />
        <label htmlFor="skillsLayouts-4">skills 4</label>
      </div>
      <div
        className={
          "p-2 rounded-md border flex gap-2 justify-start items-center hover:bg-primary-foreground duration-150"
        }
      >
        <input
          type="radio"
          id="skillsLayouts-5"
          name={"skillsLayouts"}
          value="5"
          onChange={(e) =>
            setLayouts({ ...layouts, skillsLayout: e.target.value })
          }
        />
        <label htmlFor="skillsLayouts-5">skills 5</label>
      </div>

      <input
        disabled={pending}
        className="px-4 py-2 border disabled:bg-green-500 rounded-md cursor-pointer hover:bg-primary-foreground duration-150"
        type="submit"
        value={pending ? "saving..." : "save changes"}
      />
    </form>
  );
}
