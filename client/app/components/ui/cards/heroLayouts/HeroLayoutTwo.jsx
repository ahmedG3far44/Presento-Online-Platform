import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import GradientText from "./GradientText";
function HeroLayoutTwo({ name, summary, img, jobTitle, edit, contacts }) {
  return (
    <section
      className={cn(
        edit === "edit" ? `border-2 border-dashed` : null,
        "flex justify-center  items-start gap-8 max-sm:gap-2 max-w-full w-full border  rounded-md   p-8 max-sm:flex-col max-md:flex-col flex-wrap"
      )}
    >
      <div className="flex-1 flex flex-col justify-start items-start  font-bold flex-wrap gap-2  rounded-md h-full">
        <GradientText
          textSize={"3xl"}
          mainColor={"blue-500"}
          secondaryColor={"purple-700"}
          className="max-sm:text-2xl max-sm:w-full max-md:w-full min-w-72  font-bold w-3/4"
        >
          {name || "your name"}
        </GradientText>
        <h3 className="text-muted-foreground w-3/4 text-wrap">
          {jobTitle || "Your Job Title || Position"}
        </h3>
        <ContactsCard contacts={contacts} />
      </div>

      <div className="flex-1 h-full min-w-80 min-h-80  overflow-hidden flex justify-center items-center   rounded-xl ">
        <Image
          height={400}
          width={400}
          src={img || NoImage}
          alt="hero section image "
          className="object-cover rounded-2xl min-w-80 min-h-80"
        />
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
