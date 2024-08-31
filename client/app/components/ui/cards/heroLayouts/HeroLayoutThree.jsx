import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import GradientText from "./GradientText";

function HeroLayoutThree({ name, summary, img, jobTitle, edit, contacts }) {
  return (
    <section
      className={cn(
        edit && `border-2 border-dashed`,
        "flex justify-center  items-center gap-8  max-w-full w-full border  rounded-md  p-8 max-sm:p-4 max-md:p-4 max-sm:flex-wrap max-md:flex-wrap"
      )}
    >
      <div className="w-1/2 h-full min-w-80 min-h-80  overflow-hidden flex justify-center items-center  rounded-md ">
        <Image
          height={400}
          width={400}
          src={img || NoImage}
          alt="hero section image "
          className="object-cover rounded-xl min-w-80 min-h-80"
        />
      </div>

      <div className="flex flex-col justify-start items-start gap-4  w-full p-8 max-sm:p-0 max-md:p-2">
        <div className="p-4 w-full max-w-full flex flex-col justify-start items-start  font-bold flex-wrap rounded-md h-full">
          <GradientText
            textSize={"3xl"}
            mainColor={"blue-500"}
            secondaryColor={"purple-700"}
            className="max-sm:text-2xl max-sm:w-full max-md:w-full  font-bold w-3/4"
          >
            {name || "your name"}
          </GradientText>

          <h3 className="text-muted-foreground max-w-1/2 text-wrap">
            {jobTitle || "Your Job Title || Position"}
          </h3>
          <ContactsCard contacts={contacts} />
        </div>
        <div className="p-4 w-full bg-primary-foreground text-primary rounded-xl">
          <summary className="w-full overflow-hidden max-w-full max-h-full text-wrap">
            {summary ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
          </summary>
        </div>
      </div>
    </section>
  );
}

export default HeroLayoutThree;
