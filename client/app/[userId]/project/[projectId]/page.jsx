"use client";

import Link from "next/link";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { GoHeart } from "react-icons/go";
import { LuEye } from "react-icons/lu";
// import { GoHeartFill } from "react-icons/go";
import "../../../globals.css";

function ProjectDetailsPage() {
  const { userId, projectId } = useParams();
  const router = useRouter();
  const [project, setProject] = useState();
  const [activeImage, setImage] = useState(null);
  useEffect(() => {
    async function getProjectDetails(userId, projectId) {
      try {
        const request = await fetch(
          `http://localhost:4000/api/${userId}/project/${projectId}`
        );
        const data = await request.json();
        return data;
      } catch (error) {
        return {
          error: "can't get project details",
          message: error.message,
        };
      }
    }

    getProjectDetails(userId, projectId)
      .then((data) => {
        console.log(data);
        setProject(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  return (
    <section
      className={
        "w-3/4 flex justify-center items-start max-md:flex-wrap  gap-4 m-auto my-20 max-md:my-4 relative max-md:flex-col-reverse max-md:w-full p-8"
      }
    >
      <Link
        className="absolute -left-28 top-0 hover:bg-secondary duration-150 p-2 rounded-md"
        href={`/${userId}`}
      >
        <LiaLongArrowAltLeftSolid size={30} />
      </Link>
      <div className="w-[60%] max-md:w-full flex flex-col justify-center items-center gap-8 ">
        {project?.ImagesList.map((image) => {
          return (
            <div
              className={
                "w-full h-full  overflow-hidden border shadow-sm rounded-xl p-4 bg-card"
              }
            >
              <img
                lazy
                preload
                className="w-full max-w-full min-w-full object-cover h-full max-h-full min-h-full bg-secondary rounded-xl"
                src={image?.url}
                width={200}
                height={200}
              />
            </div>
          );
        })}
        <Link
          className={
            "flex justify-center items-center gap-2 px-4 py-2 rounded-xl hover:bg-secondary duration-150 border bg-card"
          }
          href={`/${userId}`}
        >
          <LiaLongArrowAltLeftSolid size={30} />
          Back Home
        </Link>
      </div>
      <div className="max-md:w-full w-[40%] min-w-[30%] flex flex-col justify-start items-start gap-4  bg-card p-4 rounded-md border max-md:static sticky top-0 right-0 ">
        <h1 className={"text-2xl font-bold"}>{project?.title}</h1>
        <div className="border rounded-md w-full overflow-hidden bg-secondary">
          <img
            src={project?.thumbnail}
            width={150}
            height={150}
            alt={"projects thumbnail"}
            className={"w-full h-full object-cover"}
          />
        </div>
        <div>
          <p>{project?.description}</p>
        </div>
        <div className={"flex justify-start items-center gap-2 flex-wrap"}>
          {!!project?.tags.length ? (
            <>
              {project?.tags.map((tag) => {
                return (
                  <>
                    {tag.tagName !== "" && (
                      <span
                        className={"px-4 py-1 rounded-3xl border bg-secondary "}
                        key={tag.id}
                      >
                        #{tag.tagName}
                      </span>
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-start items-center gap-4  w-full border rounded-md p-4">
          <div className="flex justify-start items-center gap-2">
            <span>
              <GoHeart size={20} />
            </span>
            <span>18.4k</span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span>
              {" "}
              <LuEye size={20} />
            </span>
            <span>60.9k</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetailsPage;
