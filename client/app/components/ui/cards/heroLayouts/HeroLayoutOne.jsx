import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import GradientText from "./GradientText";

function HeroLayoutOne({ edit, name, contacts, img, summary, jobTitle }) {
  return (
    <section className="  w-full  flex justify-center  items-center gap-8   my-4 rounded-md  p-8 max-sm:p-4 max-sm:flex-col max-md:flex-col max-sm:flex-wrap max-md:flex-wrap">
      <div
        className={cn(
          edit && `border-2 border-dashed`,
          "flex-1 flex flex-col justify-start items-start  flex-wrap gap-2  rounded-md h-full"
        )}
      >
        <GradientText
          textSize={"3xl"}
          mainColor={"blue-500"}
          secondaryColor={"purple-700"}
          className="font-bold w-full"
        >
          {name || "your name"}
        </GradientText>
        <h3 className="text-muted-foreground text-xl font-semibold  max-w-full text-wrap">
          {jobTitle || "Your Job Title || Position"}
        </h3>
        <ContactsCard contacts={contacts} />
      </div>
      <div
        className={cn(
          edit && `border-2 border-dashed`,
          "flex-1 overflow-hidden  flex justify-center items-center  rounded-xl h-full min-w-80 min-h-80 "
        )}
      >
        <Image
          height={400}
          width={400}
          src={img || NoImage}
          alt="hero section image"
          className="object-cover rounded-xl min-w-80 min-h-80 "
        />
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
