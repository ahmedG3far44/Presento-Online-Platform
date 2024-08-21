import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";

function HeroLayoutThree({ name, summary, img, jobTitle, edit, contacts }) {
  return (
    <section
      className={cn(
        edit === "edit" ? `border-2 border-dashed` : "",
        "flex justify-center  items-center gap-8  w-full border  rounded-md  p-8 "
      )}
    >
      <div className="w-1/2 p-4 border-2 border-dashed overflow-hidden flex justify-center items-center  rounded-md h-full">
        <Image
          height={400}
          width={400}
          src={img || NoImage}
          alt="hero section image "
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-4  w-full p-8">
        <div className="p-4 w-full flex flex-col justify-start items-start  font-bold flex-wrap border-2 border-dashed  rounded-md h-full">
          <h1 className="text-2xl max-w-3/4">{name || "your name"}</h1>
          <h3 className="text-muted-foreground w-3/4 text-wrap">
            {jobTitle || "Your Job Title || Position"}
          </h3>
          <ContactsCard contacts={contacts} />
        </div>
        <div className="w-full max-w-fit p-4 border-2 border-dashed  rounded-md h-full flex-wrap">
          <p className="w-full overflow-hidden max-w-full max-h-full flex flex-wrap text-muted-foreground">
            {summary ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroLayoutThree;
