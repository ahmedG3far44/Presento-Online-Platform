import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { MdRemoveRedEye } from "react-icons/md";

function ProjectCard({
  id,
  title,
  description,
  thumbnail,
  views,
  likes,
  userId,
  state,
  layoutStyle,
}) {
  const isLike = false;
  return (
    <div className="max-h-96 rounded-md flex flex-col border   justify-center items-center gap-2 p-4">
      <div className="w-full flex-1 min-h-1/2 overflow-hidden rounded-md mb-4">
        <Image
          width={250}
          height={250}
          src={
            thumbnail ||
            "https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
          }
          alt="thumbnail image"
          className="max-w-full max-h-full w-full h-full object-cover rounded-md"
        />
      </div>
      <div>
        {state ? (
          <h1 className="font-bold  duration-150">
            {title || "Project Title Name"}
          </h1>
        ) : (
          <Link
            href={`/${userId}/project/${id}`}
            className="font-bold hover:underline duration-150"
          >
            {title || "Project Title"}
          </Link>
        )}
        <p className=" max-h-10 overflow-y-hidden text-sm text-muted">
          {description || "project description"}
        </p>
        {/* <div className="w-full flex justify-start items-center gap-1 my-2 flex-wrap">
            {tags.map((tag, index) => {
              return (
                <span className="text-blue-500 font-normal " key={index}>
                  #{tag}
                </span>
              );
            })}
          </div> */}
      </div>
      {!state && (
        <div className="w-full flex justify-start items-center gap-4 border-t pt-4">
          <span className="flex justify-center items-center gap-2 text-muted">
            {isLike ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
            {likes}
          </span>
          <span className="flex justify-center items-center gap-2 text-muted">
            <MdRemoveRedEye size={20} />
            {parseInt(views / 10000000000000) || 0.0}K
          </span>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
