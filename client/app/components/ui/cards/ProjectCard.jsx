import Image from "next/image";
import Link from "next/link";

function ProjectCard({
  title,
  description,
  thumbnail,
  tags,
  demoLink,
  liveLink,
}) {
  return (
    <div className="w-96 max-h-96 p-4 rounded-md shadow-md flex flex-col justify-start items-start gap-3 border">
      <div className="w-full max-h-96  overflow-hidden rounded-md">
        <Image
          width={350}
          height={250}
          src={
            thumbnail ||
            "https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
          }
          alt="thumbnail image"
          className="max-w-full max-h-1/2 h-1/2 object-cover rounded-md"
        />
      </div>
      <div className="w-full h-1/2">
        <h1 className="font-bold">{title || "Project Title"}</h1>
        <p className=" max-h-10 overflow-y-hidden text-sm">
          {description || "project discription"}
        </p>
        <div className="w-full flex justify-start items-center gap-1 my-2 flex-wrap">
          {tags.map((tag, index) => {
            return (
              <span className="text-blue-500 font-normal " key={index}>
                #{tag}
              </span>
            );
          })}
        </div>
        <div className="w-full flex justify-between items-center ">
          <Link href={demoLink}>Demo Link</Link>
          <Link href={liveLink}>Live Link</Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
