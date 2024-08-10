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
}) {
  const isLike = false;
  return (
    <div className="w-64 max-h-96 p-4 rounded-md shadow-md flex flex-col justify-start items-start gap-3 border">
      <div className="w-full max-h-96  overflow-hidden rounded-md">
        <Image
          width={250}
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
        <Link
          href={`/${userId}/project/${id}`}
          className="font-bold hover:underline duration-150"
        >
          {title || "Project Title"}
        </Link>
        <p className=" max-h-10 overflow-y-hidden text-sm">
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
        <div className="w-full flex justify-start items-center mt-4 gap-4 border-t pt-4">
          <span className="flex justify-start items-center gap-2">
            {isLike ? (
              <AiFillLike size={20} color="gray" />
            ) : (
              <AiOutlineLike size={20} color="gray" />
            )}
            {likes}
          </span>
          <span className="flex justify-center items-center gap-2 ">
            <MdRemoveRedEye size={20} color="gray" />
            {parseInt(views / 10000000000000)}K
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
