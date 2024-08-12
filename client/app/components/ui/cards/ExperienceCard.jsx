import Image from "next/image";
import NoImage from "@/public/noImage.png";
import { MdOutlineLocationOn } from "react-icons/md";
import credentials from "@/app/credentials/credentials";
import { LuFileEdit } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import Link from "next/link";

async function ExperienceCard({
  cName,
  cLogo,
  position,
  role,
  start,
  end,
  location,
  userId,
}) {
  const date = new Date();
  const { isLogged } = await credentials();
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4  rounded-md p-4 shadow-sm border ">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center  w-full gap-4">
          <div className="w-10 h-10 overflow-hidden rounded-xl border  flex justify-center items-center">
            <Image
              width={50}
              height={50}
              className="object-cover w-full h-full"
              src={cLogo || NoImage}
              alt="company logo"
            />
          </div>

          <div className="flex flex-col ">
            <h1 className="font-bold ">{cName}</h1>
            <h3>{position}</h3>
          </div>
        </div>
        {isLogged ? (
          <div className="flex justify-center items-center gap-2">
            <Link
              className="hover:bg-gray-900 duration-150 p-2 rounded-md"
              href={`/${userId}/profile/experiences`}
            >
              <span>
                <LuFileEdit size={20} />
              </span>
            </Link>
            <Link
              className="hover:bg-gray-900 duration-150 p-2 rounded-md"
              href={`/${userId}/profile/experiences`}
            >
              <span>
                <LuTrash size={20} />
              </span>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4 flex-1">
            <h4 className="w-full flex justify-center items-center gap-1">
              <span>{date.getFullYear(start)} </span>
              {"/"}
              <span>{date.getMonth(start)}</span>
            </h4>
            -
            <h4 className="w-full flex justify-center items-center gap-1">
              <span>{date.getFullYear(end)}</span>
              {"/"}
              <span>{date.getMonth(end)}</span>
            </h4>
          </div>
        )}
      </div>

      <p className=" w-full overflow-hidden">{role}</p>

      <div className="flex gap-2">
        <span>
          <MdOutlineLocationOn size={20} />
        </span>{" "}
        <h6>{location}</h6>
      </div>
    </div>
  );
}

export default ExperienceCard;
