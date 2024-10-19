// import Image from "next/image";
import Link from "next/link";
// import { AiOutlineLike } from "react-icons/ai";
// import { AiFillLike } from "react-icons/ai";
// import { MdRemoveRedEye } from "react-icons/md";

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
  // const isLike = false;
  return (
    <div
      className={`p-4 w-full rounded-md  bg-card border   
      ${layoutStyle === "1" && "flex flex-col justify-start items-start gap-4"}
      ${layoutStyle === "2" && ""}
      ${
        layoutStyle === "3" &&
        "flex w-full  flex-row-reverse justify-center items-center gap-4"
      }
      ${
        layoutStyle === "4" &&
        "flex flex-col   justify-center items-start gap-2"
      }`}
    >
      <div
        className={` border
          ${
            layoutStyle === "1"
              ? "w-full  overflow-hidden rounded-md mb-4"
              : layoutStyle === "2"
              ? "flex flex-col justify-center items-center gap-4"
              : layoutStyle === "3"
              ? "flex-1 h-full rounded-xl "
              : layoutStyle === "4"
              ? "w-full  max-w-3/4 h-full rounded-xl "
              : null
          }
        `}
      >
        <img
          priority="true"
          width={250}
          height={250}
          src={
            !!thumbnail
              ? thumbnail
              : "https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
          }
          alt="thumbnail image"
          className="max-w-full max-h-1/2 max-h-full w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1 flex flex-col justify-start items-start gap-2 mt-4">
        <div className="mt-auto">
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
        </div>

        {/* {!state && (
          <div className="w-full flex justify-start items-center gap-4  pt-2">
            <span  className="flex justify-center items-center gap-2 text-muted">
              {isLike ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
              {likes}
            </span>
            <span className="flex justify-center items-center gap-2 text-muted">
              <MdRemoveRedEye size={20} />
              {parseInt(views / 10000000000000) || 0.0}K
            </span>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default ProjectCard;
