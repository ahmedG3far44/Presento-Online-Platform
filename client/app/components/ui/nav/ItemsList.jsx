"use client";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  deleteExperience,
  deleteProject,
  deleteSkill,
} from "@/app/actions/delete/actions";
import { useState } from "react";
import DeleteBtn from "../profile/forms/DeleteBtn";
import UpdateBtn from "../profile/forms/UpdateBtn";
import { AiFillLike } from "react-icons/ai";
import { LuTrash, LuSearch } from "react-icons/lu";
import { MdOutlineSearchOff } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import Link from "next/link";
import { useParams } from "next/navigation";

function ItemsList({ list, sectionName }) {
  const [search, setSearch] = useState("");

  const { userId } = useParams();
  const filteredList = list.filter((item) => {
    switch (sectionName) {
      case "experiences":
        return item.cName.toLowerCase().includes(search.toLowerCase());
      case "projects":
        return item.title.toLowerCase().includes(search.toLowerCase());
      case "skills":
        return item.skillName.toLowerCase().includes(search.toLowerCase());
      default:
        break;
    }
  });

  return (
    <div className="flex flex-col justify-start items-start gpa-4 ">
      <div className="w-full  rounded-md py-4   flex flex-col justify-start items-start gap-2">
        <h1>List Of {sectionName.toUpperCase()}</h1>
        <label
          htmlFor="search"
          className="w-1/2 max-sm:w-full max-md:w-full flex justify-between items-center relative "
        >
          <input
            type="search"
            id="search"
            className="p-2  rounded-md w-full border mt-4 bg-muted"
            placeholder="search for items..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="text-muted-foreground absolute right-5 top-7 ">
            <LuSearch size={20} />
          </span>
        </label>
      </div>

      <div className="w-full rounded-md mt-10 flex flex-col justify-start flex-wrap  items-start gap-2">
        {filteredList.length > 0 ? (
          <div className="w-full mb-10">
            {filteredList.map((item) => {
              const lastUpdate =
                Date.now() - new Date(item?.updatedAt).getMilliseconds();
              const date = handleDateTime(lastUpdate);
              return (
                <div
                  key={item.id}
                  className="w-full flex justify-start items-center gap-8  py-4 px-2 border-b "
                >
                  {sectionName === "experiences" && (
                    <div className="flex justify-center gap-4 max-sm:gap-2 items-center w-3/4 max-sm:w-full max-md:w-full max-sm:flex-col max-md:flex-col max-sm:items-start max-md:items-start">
                      <div className="w-10 h-10 min-w-10 min-h-10 mr-8 overflow-hidden rounded-md flex justify-center items-center border  max-sm:flex-wrap max-md:flex-wrap ">
                        <Image
                          src={item?.cLogo || NoImage}
                          className="object-cover rounded-md"
                          width={40}
                          height={40}
                          alt="experience company logo image"
                        />
                      </div>
                      <div className="w-full flex justify-center items-center flex-wrap gap-2 max-sm:flex-col max-sm:justify-start  max-sm:items-start">
                        <h1 className="w-full font-bold text-muted-foreground max-sm:text-sm max-md:text-sm">
                          {item?.cName}
                        </h1>
                        <h1 className="w-full  text-muted-foreground max-sm:text-sm max-md:text-sm">
                          {item?.position}
                        </h1>
                      </div>
                      <span className="ml-5 text-sm text-muted-foreground">
                        {date}
                      </span>
                    </div>
                  )}
                  {sectionName === "projects" && (
                    <div className="w-full max-w-full flex justify-start items-center gap-8 max-sm:gap-2 max-md:gap-4">
                      <div className="w-10 h-10 min-w-10 min-h-10  overflow-hidden rounded-md flex justify-center items-center border  ">
                        <Image
                          src={item?.thumbnail || NoImage}
                          className="object-cover w-full h-full rounded-md"
                          width={40}
                          height={40}
                          alt="experience company logo image"
                        />
                      </div>

                      <Link
                        href={`/${userId}/project/${item?.id}`}
                        className="font-semibold hover:underline"
                      >
                        {item?.title}
                      </Link>

                      <div className="ml-5 flex justify-center items-center gap-2">
                        <span>
                          <AiFillLike size={20} color="gray" />
                        </span>
                        {parseInt(item?.likes) || 10}K
                      </div>

                      <div className="ml-5 flex justify-center items-center gap-2">
                        <span>
                          <LuEye size={20} color="gray" />
                        </span>
                      </div>
                      <div className="ml-5 flex justify-center items-center gap-2">
                        {item?.createdAt}
                      </div>
                    </div>
                  )}
                  {sectionName === "skills" && (
                    <>
                      <div className="w-10 h-10 min-w-10 min-h-10 overflow-hidden rounded-md flex justify-center items-center max-sm:flex-wrap max-md:flex-wrap">
                        <Image
                          src={item?.skillLogo || NoImage}
                          className="object-cover rounded-md"
                          width={40}
                          height={40}
                          alt="experience company logo image"
                        />
                      </div>
                      <h1 className="font-semibold ">{item?.skillName}</h1>
                    </>
                  )}
                  <div className="ml-auto mr-10 max-sm:mr-8 w-full flex justify-end items-center  gap-8 ">
                    <UpdateBtn sectionName={sectionName} initialUpdate={item} />
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <span className="hover:text-destructive">
                          <LuTrash size={20} />
                        </span>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Removing Item from {sectionName} :
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            are you sure you want to delete this item {item.id}{" "}
                            you were not be able to have the data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="border-destructive border hover:border-red-600 bg-destructive w-20 flex justify-center items-center hover:bg-destructive">
                            <DeleteBtn
                              deleteFunction={
                                sectionName === "experiences"
                                  ? deleteExperience
                                  : sectionName === "projects"
                                  ? deleteProject
                                  : sectionName === "skills"
                                  ? deleteSkill
                                  : null
                              }
                              id={item.id}
                            />
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-muted flex justify-center items-center gap-4">
            <span>There is no items with this name</span>{" "}
            <MdOutlineSearchOff size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemsList;

// 5 min => 300000 ms => 5 minutes ago
// 15 min => 900000 ms => 15 min ago
// 30 min => 1800000 ms => 30 min ago
// 1 hour => 3600000 ms => 1 hour ago
// 24 hour => 86400000 ms => 1 day ago
// 24 * 7  hour week  => 604800000 ms => 1 week ago
// 24 * 30  hour month  => 2.5920E+9 ms  => 1 month ago

// min
// hour
// day
// week
// month
// year

function handleDateTime(dateInMileSecond) {
  const timing = {
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    month: 2.628e9,
  };

  switch (dateInMileSecond) {
    case dateInMileSecond <= timing.hour:
      return dateInMileSecond;

    case dateInMileSecond > timing.hour:
      return dateInMileSecond;

    case dateInMileSecond > timing.day:
      return dateInMileSecond;

    case dateInMileSecond >= timing.month:
      return dateInMileSecond;

    default:
      break;
  }
}
