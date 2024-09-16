"use client";
import Container from "@/app/components/ui/containers/Container";
import Image from "next/image";
import Link from "next/link";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import LikeBtn from "@/app/components/ui/profile/forms/LikeBtn";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
        const data = request.json();
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
    <Container
      className={
        "m-auto relative min-h-screen max-h-screen no-scrollbar overflow-y-scroll"
      }
    >
      <div className="sticky left-10 top-10 cursor-pointer hover:text-muted duration-150">
        <Link href={`/${userId}`}>
          <span>
            <LiaLongArrowAltLeftSolid size={30} />
          </span>
        </Link>
      </div>
      <div
        className={
          "p-4 border absolute right-10 top-10 flex justify-center items-center gap-4 rounded-3xl"
        }
      >
        <LikeBtn views={project?.views} likes={project?.likes} />
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-10  m-auto">
        <h1 className={"w-full text-5xl text-center font-mono font-bold "}>
          {project?.title}
        </h1>
        <div className="w-1/2 m-auto p-4 rounded-md border flex flex-col justify-start items-start gap-2">
          <span className={"text-start self-start"}>project description:</span>
          <p className={"w-full text-wrap "}>{project?.description}</p>
        </div>
        <div className="w-full max-h-[500] flex justify-center items-center  overflow-hidden">
          <Image
            src={!!activeImage ? activeImage : project?.thumbnail}
            width={600}
            height={600}
            className={"rounded-md slide"}
            alt="project thumbnail "
          />
        </div>
        <div
          className={"flex justify-start items-center gap-4 flex-wrap w-1/2 "}
        >
          {project?.tags.map((tag) => {
            return (
              <div className={"p-1 px-3 rounded-3xl border-2"} key={tag?.id}>
                <h1 className={"text-muted-foreground"}>#{tag?.tagName}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <div className={"p-4 flex justify-center items-center gap-2"}>
        {project?.ImagesList.map((img) => {
          return (
            <div
              className={
                img.url === activeImage && "border  rounded-xl scale-110"
              }
              onClick={() => setImage(img.url)}
            >
              <Image
                key={img.id}
                src={img.url}
                width={200}
                height={200}
                className="rounded-md scale-95 hover:scale-100 duration-150 cursor-pointer border-2 border-transparent p-2"
                alt="project thumbnail"
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default ProjectDetailsPage;
