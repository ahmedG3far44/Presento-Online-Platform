"use client";

import { layoutsSchema } from "@/lib/schema";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useFormStatus } from "react-dom";
import { useParams, useRouter } from "next/navigation";
function ChangeLayoutForm({ layoutsInfo }) {
  const layoutFormRef = useRef(null);
  const status = useFormStatus();
  const router = useRouter();
  const { userId } = useParams();
  const { toast } = useToast();
  const [layouts, setLayouts] = useState({
    expLayout: layoutsInfo.expLayout,
    projectsLayout: layoutsInfo.projectsLayout,
    skillsLayout: layoutsInfo.skillsLayout,
  });
  console.log(layouts);
  const updateLayoutsAction = async () => {
    const validLayouts = layoutsSchema.safeParse(layouts);
    if (!validLayouts.success) {
      toast({
        variants: "destructive",
        title: "can't update layouts",
        description: "the type of data not accepted",
      });
    }
    try {
      const request = await fetch(
        `http://localhost:4000/api/${layoutsInfo?.usersId}/layouts/${layoutsInfo?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validLayouts?.data),
        }
      );
      const response = request.json();
      console.log(response);
      router.refresh();
      toast({
        title: response.then((res) => res.type),
        description: response.then((res) => res.message),
      });

      return;
    } catch (error) {
      toast({
        title: "connection error",
        description: error.message,
      });
    }
  };
  return (
    <form
      className={"p-4 rounded-md w-72 border fixed left-0 bottom-0"}
      action={updateLayoutsAction}
      ref={layoutFormRef}
    >
      <div className={"flex justify-start items-center gap-2 flex-wrap"}>
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
          <label for="expLayout-1">Exp 1</label>
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
          <label for="expLayout-2">Exp 2</label>
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
          <label for="expLayout-3">Exp 3</label>
        </div>
      </div>
      <br />
      <div className={"flex justify-start items-center gap-2 flex-wrap"}>
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
          <label for="project-1">Project 1</label>
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
          <label for="project-2">Project 2</label>
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
          <label for="project-3">Project 3</label>
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
          <label for="project-4">Project 4</label>
        </div>
      </div>
      <br />
      <div className={"flex justify-start items-center gap-2 flex-wrap"}>
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
          <label for="skillsLayouts-1">skills 1</label>
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
          <label for="skillsLayouts-2">skills 2</label>
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
          <label for="skillsLayouts-3">skills 3</label>
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
          <label for="skillsLayouts-4">skills 4</label>
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
            value="5"
            onChange={(e) =>
              setLayouts({ ...layouts, skillsLayout: e.target.value })
            }
          />
          <label for="skillsLayouts-5">skills 5</label>
        </div>
      </div>
      <br />
      <input
        className="px-4 py-2 border rounded-md w-full cursor-pointer hover:bg-primary-foreground duration-150"
        type="submit"
        value={"save layouts"}
      />
    </form>
  );
}

export default ChangeLayoutForm;
