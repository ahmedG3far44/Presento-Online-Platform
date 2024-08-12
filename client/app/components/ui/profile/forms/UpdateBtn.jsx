"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitBtn from "./SubmitBtn";
import { Button } from "@/components/ui/button";
import credentials from "@/app/credentials/credentials";

const getOneExperiences = async (id) => {
  const { user } = await credentials();
  try {
    const request = await fetch(
      `http://localhost:4000/api/${user.id}/experiences/${id}`
    );
    const data = request.json();
    return data;
  } catch (error) {
    return {
      error: "can't get one experiences info",
      message: error.message,
    };
  }
};
function UpdateBtn({ updateActionFunc, id }) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">update</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>update experience form</DialogTitle>
            <DialogDescription>updating item with ID: {id}</DialogDescription>
          </DialogHeader>
          <form
            action={() => updateActionFunc(id)}
            className="w-full sm:w-full flex flex-col justify-start items-start gap-2 py-4"
          >
            <input
              className="p-2 w-full rounded-md border"
              type="text"
              name="cName"
              placeholder="company name"
              //   defaultValue={exp.cName}
            />
            <input
              className="p-2 w-full rounded-md border"
              type="url"
              name="cLogo"
              placeholder="company logo url"
              //   defaultValue={exp.cLogo}
            />
            <input
              //   defaultValue={exp.position}
              className="p-2 w-full rounded-md border"
              type="text"
              name="position"
              placeholder="your position or Job-title"
            />
            <textarea
              className="w-full  p-2 rounded-md border"
              placeholder="my role "
              name="role"
              id="role"
              // value={"hello"}
              //   defaultValue={exp.role}
            ></textarea>
            <div className="w-full flex justify-start items-start gap-4 mb-1 md:flex-wrap">
              <label className="w-full text-sm">
                Start Date
                <input
                  className="p-2 w-full rounded-md border"
                  type="date"
                  name="start"
                  placeholder="start date"
                  //   defaultValue={exp.start}
                />
              </label>
              <label className="w-full text-sm ">
                End Date
                <input
                  className="p-2 w-full rounded-md border"
                  type="date"
                  name="end"
                  placeholder="end date"
                  //   defaultValue={exp.end}
                />
              </label>
            </div>
            <input
              className="p-2 w-full rounded-md border"
              type="text"
              name="location"
              placeholder="enter the job location"
              //   defaultValue={exp.location}
            />
            <input type="submit" value={"update"} state={"update"} />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateBtn;
