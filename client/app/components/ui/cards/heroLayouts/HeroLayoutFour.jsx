import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import GradientText from "./GradientText";

function HeroLayoutFour({ name, summary, img, jobTitle, edit, contacts }) {
  return (
    <section
      className={cn(
        edit && `border-2 border-dashed`,
        "flex justify-center  items-center gap-8  max-sm:gap-4 max-md:gap-4 w-full  border rounded-md  p-8 max-sm:p-4 max-md:p-4 max-sm:flex-wrap max-sm:flex-col-reverse max-md:flex-col-reverse "
      )}
    >
      <div className="flex-1 flex flex-col justify-between items-start gap-0">
        <div className="p-4 w-full flex flex-col justify-start items-start  font-bold rounded-md h-full">
          <GradientText
            textSize={"3xl"}
            mainColor={"blue-500"}
            secondaryColor={"purple-700"}
            className="max-sm:text-2xl max-sm:w-full max-md:w-full max-md:2xl font-bold w-3/4"
          >
            {name || "your name"}
          </GradientText>
          <h3 className=" text-muted-foreground w-3/4 max-sm:w-full md:w-full ">
            {jobTitle || "Your Job Title || Position"}
          </h3>
          <ContactsCard contacts={contacts} />
        </div>

        <div className="w-3/4 max-sm:w-full  max-md:w-full h-full p-4  text-primary bg-primary-foreground rounded-md">
          <summary className="overflow-hidden">
            {summary ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
          </summary>
        </div>
      </div>

      <div className="p-4 flex-1 h-full overflow-hidden max-w-80 max-h-80 rounded-xl  flex justify-center items-center">
        <Image
          height={400}
          width={400}
          src={img || NoImage}
          alt="hero section image "
          className="object-cover rounded-md min-w-80 min-h-80"
        />
      </div>
    </section>
  );
}

export default HeroLayoutFour;
