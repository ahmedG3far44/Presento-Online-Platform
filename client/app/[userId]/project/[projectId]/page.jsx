import Container from "@/app/components/ui/containers/Container";
import Image from "next/image";
import Link from "next/link";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import LikeBtn from "@/app/components/ui/profile/forms/LikeBtn";

async function ProjectDetailsPage({ params }) {
  const { userId, projectId } = params;
  const project = await getProjectDetails(userId, projectId);

  return (
    <Container className={"m-auto relative min-h-screen max-h-screen "}>
      <div className="absolute left-10 top-10 cursor-pointer hover:text-muted duration-150">
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
        <LikeBtn views={project.views} likes={project.likes} />
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-4 m-auto">
        <h1 className={"w-full text-5xl text-center font-mono font-bold "}>
          {project.title}
        </h1>
        <div className="w-1/2 m-auto p-4 rounded-md bg-muted text-muted-foreground flex flex-col justify-start items-start gap-2">
          <span className={"text-start self-start"}>project description:</span>
          <p className={"w-full text-wrap "}>{project.description}</p>
        </div>
        <div className="flex justify-center items-center w-full overflow-hidden">
          <Image
            src={project.thumbnail}
            width={600}
            height={600}
            className={"rounded-md "}
            alt="project thumbnail "
          />
        </div>
        <div
          className={"flex justify-start items-center gap-4 flex-wrap w-1/2 "}
        >
          {project.tags.map((tag) => {
            return (
              <div
                className={"p-1 px-3  bg-muted  rounded-3xl border-2"}
                key={tag.id}
              >
                <h1 className={"text-muted-foreground"}>#{tag.tagName}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <div className={"p-4 flex justify-center items-center gap-2"}>
        {project.ImagesList.map((img) => {
          return (
            <Image
              key={img.id}
              src={img.url}
              width={200}
              height={200}
              className="rounded-md scale-95 hover:scale-100 duration-150 cursor-pointer border-2 border-transparent hover:border-primary-foreground p-2"
              alt="project thumbnail"
            />
          );
        })}
      </div>
    </Container>
  );
}

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

export default ProjectDetailsPage;
