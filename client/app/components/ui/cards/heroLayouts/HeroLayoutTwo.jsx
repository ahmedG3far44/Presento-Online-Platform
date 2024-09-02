import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import GradientText from "./GradientText";
import ResumeDownloadBtn from "../ResumeDownloadBtn";
import UploadImage from "../../profile/forms/UploadImage";
function HeroLayoutTwo({
  name,
  summary,
  img,
  jobTitle,
  edit,
  contacts,
  isLogged,
  id,
}) {
  return (
    <section
      className={cn(
        edit === "edit" ? `border-2 border-dashed` : null,
        "flex justify-center  items-start gap-8 max-sm:gap-2 max-w-full w-full border-0  rounded-md   p-8 max-sm:flex-col max-md:flex-col flex-wrap"
      )}
    >
      <div className="flex-1 flex flex-col justify-start items-start  font-bold flex-wrap gap-2  rounded-md h-full">
        <GradientText className=" min-w-72 w-3/4">
          {name || "your name"}
        </GradientText>
        <h3 className="text-2xl text-muted-foreground w-3/4 text-wrap">
          {jobTitle || "Your Job Title || Position"}
        </h3>
        <ContactsCard contacts={contacts} />
        <ResumeDownloadBtn />
      </div>

      <div className="flex-1 h-full max-w-80 max-h-80  overflow-hidden flex justify-center items-center relative bg-muted-foreground rounded-xl ">
        <Image
          height={320}
          width={320}
          src={
            img ||
            "https://th.bing.com/th/id/OIP.AkKR5-4AJhHTNNDMp0NxvQAAAA?rs=1&pid=ImgDetMain"
          }
          alt="hero section image "
          className="object-cover rounded-2xl overflow-hidden min-w-60 min-h-60"
        />
        <>
          {isLogged && (
            <UploadImage
              id={id}
              className="w-full h-full  min-w-full min-h-full opacity-0 hover:opacity-95 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
              fileFormName={"hero-image"}
              url={`upload-image/${id}`}
              acceptedTypes={"image"}
            />
          )}
        </>
      </div>

      <div className="flex-1 p-4 rounded-md h-full flex-wrap bg-primary-foreground text-primary">
        <summary className="w-full overflow-hidden max-w-full max-h-full">
          {summary ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
        </summary>
      </div>
    </section>
  );
}

export default HeroLayoutTwo;
