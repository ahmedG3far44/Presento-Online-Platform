import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import GradientText from "./GradientText";
function HeroLayoutFive({ name, summary, img, jobTitle, edit, contacts }) {
  return (
    <section
      className={cn(
        edit === "edit" ? `border-2 border-dashed` : "",
        "flex justify-center  items-center  gap-8  w-full   rounded-md  p-8  max-sm:flex-wrap max-md:flex-wrap max-sm:flex-col max-md:flex-col"
      )}
    >
      <div className="flex-1  h-full min-w-72 min-h-72 overflow-hidden flex justify-center items-center  rounded-xl ">
        <Image
          height={400}
          width={400}
          src={img || NoImage}
          alt="hero section image "
          className="object-cover rounded-xl min-w-72 min-h-72 "
        />
      </div>
      <div className="flex-1 h-full  flex flex-col justify-start items-start gap-4  font-bold flex-wrap  rounded-md ">
        <GradientText
          textSize={"3xl"}
          mainColor={"blue-500"}
          secondaryColor={"purple-700"}
          className="max-sm:text-2xl max-sm:w-full max-md:w-full  font-bold w-3/4"
        >
          {name || "your name"}
        </GradientText>
        <h3 className="text-muted-foreground w-3/4 text-wrap">
          {jobTitle || "Your Job Title || Position"}
        </h3>
        <ContactsCard contacts={contacts} />
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
