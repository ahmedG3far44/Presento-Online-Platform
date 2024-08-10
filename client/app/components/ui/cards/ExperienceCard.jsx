import Image from "next/image";
import NoImage from "@/public/noImage.png";
import { MdOutlineLocationOn } from "react-icons/md";
function ExperienceCard({
  cName,
  cLogo,
  position,
  role,
  start,
  end,
  location,
}) {
  const date = new Date();

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
        <div className="flex justify-center items-center gap-4 flex-1">
          <h4 className="w-full flex justify-center items-center gap-2">
            <span>{date.getFullYear(start)} </span>
            <span>{date.getMonth(start)}</span>
          </h4>
          -
          <h4 className="w-full flex justify-center items-center gap-2">
            <span>{date.getFullYear(end)}</span>{" "}
            <span>{date.getMonth(end)}</span>
          </h4>
        </div>
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
