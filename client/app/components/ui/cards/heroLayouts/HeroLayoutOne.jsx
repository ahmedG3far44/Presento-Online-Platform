import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";

function HeroLayoutOne({ edit, name, contacts, img, summary, jobTitle }) {
  return (
    <section className="flex justify-center  items-center gap-8  w-full   my-4 rounded-md  p-8">
      <div
        className={cn(
          edit === "edit" ? `border-2 border-dashed` : "",
          "p-4 flex-1 flex flex-col justify-start items-start  flex-wrap gap-2  rounded-md h-full"
        )}
      >
        <h1 className="text-5xl font-bold max-w-3/4">{name || "your name"}</h1>
        <h3 className="text-muted-foreground text-2xl font-semibold  max-w-full text-wrap">
          {jobTitle || "Your Job Title || Position"}
        </h3>
        <ContactsCard contacts={contacts} />
      </div>
      <div
        className={cn(
          edit === "edit" ? `border-2 border-dashed` : "",
          "flex-1 p-2 overflow-hidden  flex justify-center items-center  rounded-md h-full"
        )}
      >
        <Image
          height={400}
          width={400}
          src={img || NoImage}
          alt="hero section image"
          className="object-cover rounded-md"
        />
      </div>
      <div
        className={cn(
          edit === "edit" ? `border-2 border-dashed` : "",
          "flex-1 max-w-fit p-4  rounded-md h-full flex-wrap"
        )}
      >
        <p className="w-full overflow-hidden max-w-full max-h-full flex flex-wrap text-muted-foreground p-4 rounded-md bg-primary-foreground">
          {summary ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
        </p>
      </div>
    </section>
  );
}

export default HeroLayoutOne;
