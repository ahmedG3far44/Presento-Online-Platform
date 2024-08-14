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
import { AiFillLike } from "react-icons/ai";
import {
  deleteExperience,
  deleteProject,
  deleteSkill,
} from "@/app/actions/delete/actions";
import DeleteBtn from "../profile/forms/DeleteBtn";
import UpdateBtn from "../profile/forms/UpdateBtn";

function ItemsList({ list, sectionName }) {
  return (
    <>
      <h1>list of {sectionName}</h1>
      <div className="w-full rounded-md mt-10 flex flex-col justify-start items-start gap-2 ">
        {list.length > 0 &&
          list.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full flex justify-start items-center gap-8  py-4 px-2 border-b"
              >
                {sectionName === "experiences" && (
                  <>
                    <div className="w-10 h-10 overflow-hidden rounded-md flex justify-center items-center border  ">
                      <Image
                        src={item.cLogo || NoImage}
                        className="object-cover w-full h-full rounded-md"
                        width={40}
                        height={40}
                        alt="experience company logo image"
                      />
                    </div>
                    <h1>{item.cName}</h1>
                    <h1 className="ml-5">{item.position}</h1>
                  </>
                )}
                {sectionName === "projects" && (
                  <>
                    <div className="w-10 h-10 overflow-hidden rounded-md flex justify-center items-center border  ">
                      <Image
                        src={item.thumbnail || NoImage}
                        className="object-cover w-full h-full rounded-md"
                        width={40}
                        height={40}
                        alt="experience company logo image"
                      />
                    </div>
                    <h1>{item.title}</h1>
                    <h1 className="ml-5 flex justify-center items-center gap-2">
                      <span>
                        <AiFillLike size={20} color="gray" />
                      </span>
                      {item.likes || 10}K
                    </h1>
                  </>
                )}
                {sectionName === "skills" && (
                  <>
                    <div className="w-10 h-10 overflow-hidden rounded-md flex justify-center items-center ">
                      <Image
                        src={item.skillLogo || NoImage}
                        className="object-cover w-full h-full rounded-md"
                        width={40}
                        height={40}
                        alt="experience company logo image"
                      />
                    </div>
                    <h1>{item.skillName}</h1>
                  </>
                )}
                <div className="ml-auto flex justify-center items-center gap-4 self-end">
                  <UpdateBtn sectionName={sectionName} initialUpdate={item} />
                  <AlertDialog>
                    <AlertDialogTrigger className="bg-red-600 text-white p-2 rounded-md hover:bg-red-800">
                      delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          are you sure you want to delete this item {item.cName}{" "}
                          width ID: {item.id}, you were not be able to have the
                          data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
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
    </>
  );
}

export default ItemsList;
