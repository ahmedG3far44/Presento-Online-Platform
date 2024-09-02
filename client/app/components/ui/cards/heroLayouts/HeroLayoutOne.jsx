import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import GradientText from "./GradientText";
import ResumeDownloadBtn from "../ResumeDownloadBtn";
import UploadImage from "../../profile/forms/UploadImage";

function HeroLayoutOne({
  id,
  edit,
  name,
  contacts,
  img,
  summary,
  jobTitle,
  isLogged,
}) {
  return (
    <section className="  w-full  flex justify-center  items-center gap-8   my-4 rounded-md  p-8 max-sm:p-4 max-sm:flex-col max-md:flex-col max-sm:flex-wrap max-md:flex-wrap">
      <div
        className={cn(
          edit && `border-2 border-dashed`,
          "flex-1 flex flex-col justify-start items-start  border-0 flex-wrap gap-2  rounded-md h-full"
        )}
      >
        <h1>{id}</h1>
        <GradientText className="w-full font-bold  text-3xl">
          {name || "your name"}
        </GradientText>
        <h3 className="text-muted-foreground text-xl font-semibold  max-w-full text-wrap">
          {jobTitle || "Your Job Title || Position"}
        </h3>
        <ContactsCard contacts={contacts} />
        <ResumeDownloadBtn />
      </div>
      <div
        className={cn(
          edit && `border-2 border-dashed`,
          "flex-1 overflow-hidden  flex justify-center items-center bg-muted-foreground  rounded-xl h-full max-w-80 max-h-80 relative"
        )}
      >
        <Image
          height={320}
          width={320}
          src={
            img ||
            "https://th.bing.com/th/id/OIP.AkKR5-4AJhHTNNDMp0NxvQAAAA?rs=1&pid=ImgDetMain"
          }
          alt="hero section image"
          className="object-cover overflow-hidden rounded-xl min-w-60 min-h-60 "
        />
        {isLogged && (
          <UploadImage
            id={id}
            className="w-full h-full  min-w-full min-h-full opacity-0 hover:opacity-95 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            fileFormName={"hero-image"}
            url={`upload-image/${id}`}
            acceptedTypes={"image"}
          />
        )}
      </div>
      <div
        className={cn(
          edit && `border-2 border-dashed`,
          "flex-1 rounded-md h-full flex-wrap bg-primary-foreground text-primary p-4"
        )}
      >
        <summary className="overflow-hidden ">
          {summary ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
        </summary>
      </div>
    </section>
  );
}

export default HeroLayoutOne;
