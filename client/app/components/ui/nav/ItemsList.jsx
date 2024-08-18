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
    <div className="flex flex-col justify-start items-start gpa-4">
      <div className="w-full  rounded-md py-4   flex flex-col justify-start items-start gap-2">
        <h1>List Of {sectionName.toUpperCase()}</h1>
        <label
          htmlFor="search"
          className="w-1/2 flex justify-between items-center relative "
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
      <div className="w-full rounded-md mt-10 flex flex-col justify-start items-start gap-2 ">
        {filteredList.length > 0 ? (
          <div className="w-full mb-10">
            {filteredList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full flex justify-start items-center gap-8  py-4 px-2 border-b"
                >
                  {sectionName === "experiences" && (
                    <div className="flex justify-around items-center w-3/4">
                      <div className="w-10 h-10 mr-8 overflow-hidden rounded-md flex justify-center items-center border  ">
                        <Image
                          src={item?.cLogo || NoImage}
                          className="object-cover w-full h-full rounded-md"
                          width={40}
                          height={40}
                          alt="experience company logo image"
                        />
                      </div>
                      <h1 className="flex-1 font-semibold">{item?.cName}</h1>
                      <h1 className="flex-1 text-muted-foreground">
                        {item?.position}
                      </h1>
                      <h1 className="ml-5 text-sm text-muted-foreground">
                        {new Date(item?.updatedAt).getDay()} days ago
                      </h1>
                    </div>
                  )}
                  {sectionName === "projects" && (
                    <>
                      <div className="w-10 h-10 overflow-hidden rounded-md flex justify-center items-center border  ">
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
                        {parseInt(item?.views / 1000000000000) || 10}K
                      </div>
                      <div className="ml-5 flex justify-center items-center gap-2">
                        <span>
                          <LuEye size={20} color="gray" />
                        </span>
                        {parseFloat(`${item?.views}`, 4) || 10}K
                      </div>
                      <div className="ml-5 flex justify-center items-center gap-2">
                        {item?.createdAt}
                      </div>
                    </>
                  )}
                  {sectionName === "skills" && (
                    <>
                      <div className="w-10 h-10 overflow-hidden rounded-md flex justify-center items-center ">
                        <Image
                          src={item?.skillLogo || NoImage}
                          className="object-cover w-full h-full rounded-md"
                          width={40}
                          height={40}
                          alt="experience company logo image"
                        />
                      </div>
                      <h1 className="font-semibold ">{item?.skillName}</h1>
                    </>
                  )}
                  <div className="ml-auto mr-10 flex justify-center items-center gap-8 self-end">
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
