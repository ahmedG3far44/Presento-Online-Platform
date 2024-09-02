"use client";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import { MdOutlineLocationOn } from "react-icons/md";
import { undefined } from "zod";
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
  layoutStyle,
}) {
  const experiencesYears = {
    years: new Date(end).getFullYear() - new Date(start).getFullYear(),
    month: null,
  };
  if (experiencesYears.years < 1) {
    experiencesYears.month =
      new Date(end).getMonth() + 1 - new Date(start).getMonth() + 1;
  }
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
    <div className="min-w-[300px] max-sm:min-w-full max-md:min-w-full w-full flex flex-col justify-start items-start gap-4  rounded-md p-4 shadow-sm border ">
      <div className="w-full flex justify-between items-center flex-wrap">
        <div
          className={` 
          ${
            layoutStyle === "1" &&
            "w-full flex justify-start items-center gap-4"
          }
          ${
            layoutStyle === "2" &&
            "w-full flex justify-start items-center gap-4"
          }
          ${
            layoutStyle === "3" &&
            "w-full flex justify-start items-center gap-4"
          }
          `}
        >
          <div className="w-10 h-10 min-w-10 min-h-10 overflow-hidden rounded-xl border  flex justify-center items-center">
            <Image
              width={50}
              height={50}
              className="object-cover w-full h-full"
              src={cLogo || NoImage}
              alt="company logo"
            />
          </div>

          <div className="flex flex-col w-full ">
            <h1 className="font-bold  w-full">{cName}</h1>
            <h3 className="text-primary text-sm w-full text-wrap">
              {position}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex justify-start  items-start gap-2 text-secondary-foreground flex-1 w-full">
        <h4 className="w-full flex justify-start items-center text-muted-foreground gap-4">
          {experiencesYears.month !== null &&
            experiencesYears.years !== null && <span>Duration:</span>}
          <span className="text-muted">
            {experiencesYears.years > "1"
              ? experiencesYears.years + " years"
              : experiencesYears.month === null
              ? ""
              : experiencesYears.month + " months"}
          </span>
        </h4>
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
