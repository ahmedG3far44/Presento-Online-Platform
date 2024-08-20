"use client";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import { MdOutlineLocationOn } from "react-icons/md";
// import { LuFileEdit } from "react-icons/lu";
// import { LuTrash } from "react-icons/lu";
// import Link from "next/link";

function ExperienceCard({
  cName,
  cLogo,
  position,
  role,
  start,
  end,
  location,
  userId,
}) {
  const monthPrefix = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
            <h3 className="text-primary text-md">{position}</h3>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 text-secondary-foreground flex-1">
          <h4 className="w-full flex justify-center items-center">
            <span className=" flex justify-center items-center">
              {monthPrefix[new Date(start).getMonth()]},
            </span>
            <span>{new Date(start).getFullYear()}</span>
          </h4>
          -
          <h4 className="w-full flex justify-center items-center ">
            <span>{monthPrefix[new Date(end).getMonth()]}</span>,
            <span>{new Date(end).getFullYear()}</span>
          </h4>
        </div>
      </div>

      <p className=" w-full text-muted-foreground overflow-hidden ">{role}</p>

      <div className="flex gap-2">
        <span className="text-muted-foreground">
          <MdOutlineLocationOn size={20} />
        </span>{" "}
        <h6 className="text-muted-foreground">{location}</h6>
      </div>
    </div>
  );
}

export default ExperienceCard;
