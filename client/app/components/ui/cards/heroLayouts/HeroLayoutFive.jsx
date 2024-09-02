import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import GradientText from "./GradientText";
import ResumeDownloadBtn from "../ResumeDownloadBtn";
import UploadImage from "../../profile/forms/UploadImage";
function HeroLayoutFive({
  id,
  name,
  summary,
  img,
  jobTitle,
  edit,
  contacts,
  isLogged,
}) {
  return (
    <section
      className={cn(
        edit === "edit" ? `border-2 border-dashed` : "",
        "flex justify-center  items-center  gap-8  w-full   rounded-md  p-8  border-0 max-sm:flex-wrap max-md:flex-wrap max-sm:flex-col max-md:flex-col"
      )}
    >
      <div className="flex-1  h-full max-w-80 max-h-80 overflow-hidden flex justify-center items-center bg-muted-foreground  rounded-xl relative">
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
      <div className="flex-1 h-full  flex flex-col justify-start items-start gap-4  font-bold flex-wrap  rounded-md ">
        <GradientText className="text-3xl max-sm:text-2xl max-sm:w-full max-md:w-full  font-bold w-3/4">
          {name || "your name"}
        </GradientText>
        <h3 className="text-muted-foreground w-3/4 text-wrap">
          {jobTitle || "Your Job Title || Position"}
        </h3>
        <ContactsCard contacts={contacts} />
        <ResumeDownloadBtn />
      </div>
      <div className="flex-1 h-full p-4  rounded-md bg-primary-foreground text-primary">
        <p className="overflow-hidden">
          {summary ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
        </p>
      </div>
    </section>
  );
}

export default HeroLayoutFive;
