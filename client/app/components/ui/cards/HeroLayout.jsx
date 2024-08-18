import Image from "next/image";
import NoImage from "@/public/noImage.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ContactsCard from "./ContactsCard";

function HeroLayout({
  name,
  summary,
  img,
  layoutStyle,
  jobTitle,
  edit,
  contacts,
}) {
  // const { given_name, family_name } = user;
  // const fullName = `${given_name} ${family_name}`;
  return (
    <div>
      {layoutStyle === "1" && (
        <section className="flex justify-center  items-center gap-8   w-full   my-4 rounded-md  p-8">
          <div
            className={cn(
              edit === "edit" ? `border-2 border-dashed` : "",
              "p-4 flex-1 flex flex-col justify-start items-start  font-bold flex-wrap  rounded-md h-full"
            )}
          >
            <h1 className="text-2xl max-w-3/4">{name || "your name"}</h1>
            <h3 className="text-xl font-semibold text-muted-foreground w-3/4 text-wrap">
              {jobTitle || "Your Job Title || Position"}
            </h3>
            <ContactsCard contacts={contacts} />

            <Button className="mt-4" variant="outline">
              Download CV
            </Button>
          </div>
          <div
            className={cn(
              edit === "edit" ? `border-2 border-dashed` : "",
              "flex-1 p-2 overflow-hidden  flex justify-center items-center  rounded-md h-full"
            )}
          >
            <Image
              height={350}
              width={350}
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
            <p className="w-full overflow-hidden max-w-full max-h-full flex flex-wrap text-muted-foreground">
              {summary ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
            </p>
          </div>
        </section>
      )}
      {layoutStyle === "2" && (
        <section
          className={cn(
            edit === "edit" ? `border-2 border-dashed` : "",
            "flex justify-center  items-start gap-8  w-full border  rounded-md  p-8"
          )}
        >
          <div className="p-4 flex-1 flex flex-col justify-start items-start  font-bold flex-wrap border-2 border-dashed  rounded-md h-full">
            <h1 className="text-2xl max-w-3/4">{name || "your name"}</h1>
            <h3 className="text-xl font-semibold text-muted-foreground w-3/4 text-wrap">
              {jobTitle || "Your Job Title || Position"}
            </h3>
            <ContactsCard contacts={contacts} />
            <Button className="mt-4" variant="outline">
              Download CV
            </Button>
          </div>
          <div className="flex-1 p-4 border-2 border-dashed overflow-hidden flex justify-center items-center   rounded-md h-full">
            <Image
              height={350}
              width={350}
              src={img || NoImage}
              alt="hero section image "
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex-1 max-w-fit p-4 border-2 border-dashed  rounded-md h-full flex-wrap">
            <p className="w-full overflow-hidden max-w-full max-h-full flex flex-wrap text-muted-foreground">
              {summary ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
            </p>
          </div>
        </section>
      )}
      {layoutStyle === "3" && (
        <section
          className={cn(
            edit === "edit" ? `border-2 border-dashed` : "",
            "flex justify-center  items-center gap-8  w-full border  rounded-md  p-8"
          )}
        >
          <div className="w-1/2 p-4 border-2 border-dashed overflow-hidden flex justify-center items-center  rounded-md h-full">
            <Image
              height={350}
              width={350}
              src={img || NoImage}
              alt="hero section image "
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-4  w-full p-8">
            <div className="p-4 w-full flex flex-col justify-start items-start  font-bold flex-wrap border-2 border-dashed  rounded-md h-full">
              <h1 className="text-2xl max-w-3/4">{name || "your name"}</h1>
              <h3 className="text-xl font-semibold text-muted-foreground w-3/4 text-wrap">
                {jobTitle || "Your Job Title || Position"}
              </h3>
              <ContactsCard contacts={contacts} />
              <Button className="mt-4" variant="outline">
                Download CV
              </Button>
            </div>
            <div className="w-full max-w-fit p-4 border-2 border-dashed  rounded-md h-full flex-wrap">
              <p className="w-full overflow-hidden max-w-full max-h-full flex flex-wrap text-muted-foreground">
                {summary ||
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
              </p>
            </div>
          </div>
        </section>
      )}
      {layoutStyle === "4" && (
        <section
          className={cn(
            edit === "edit" ? `border-2 border-dashed` : "",
            "flex justify-center  items-center gap-8  w-full  border rounded-md  p-8"
          )}
        >
          <div className="w-1/2  flex flex-col justify-between items-start gap-4">
            <div className="p-4 w-full flex flex-col justify-start items-start  font-bold flex-wrap border-2 border-dashed  rounded-md h-full">
              <h1 className="text-2xl max-w-3/4">{name || "your name"}</h1>
              <h3 className="text-xl font-semibold text-muted-foreground w-3/4 text-wrap">
                {jobTitle || "Your Job Title || Position"}
              </h3>
              <ContactsCard contacts={contacts} />
              <Button className="mt-4" variant="outline">
                Download CV
              </Button>
            </div>
            <div className="w-full  max-w-fit p-4 border-2 border-dashed  rounded-md h-full flex-wrap">
              <p className="w-full overflow-hidden max-w-full max-h-full flex flex-wrap text-muted-foreground">
                {summary ||
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
              </p>
            </div>
          </div>
          <div className="p-4 border-2 border-dashed overflow-hidden  flex justify-center items-center rounded-md h-full">
            <Image
              height={350}
              width={350}
              src={img || NoImage}
              alt="hero section image "
              className="object-cover rounded-md"
            />
          </div>
        </section>
      )}
      {layoutStyle === "5" && (
        <section
          className={cn(
            edit === "edit" ? `border-2 border-dashed` : "",
            "flex justify-center  items-start gap-8  w-full border   rounded-md  p-8"
          )}
        >
          <div className="flex-1 p-4 border-2 border-dashed overflow-hidden flex justify-center items-center  rounded-md h-full">
            <Image
              height={350}
              width={350}
              src={img || NoImage}
              alt="hero section image "
              className="object-cover rounded-md"
            />
          </div>
          <div className="p-4 flex-1 flex flex-col justify-start items-start  font-bold flex-wrap border-2 border-dashed  rounded-md h-full">
            <h1 className="text-2xl max-w-3/4">{name || "your name"}</h1>
            <h3 className="text-xl font-semibold text-muted-foreground w-3/4 text-wrap">
              {jobTitle || "Your Job Title || Position"}
            </h3>
            <ContactsCard contacts={contacts} />
            <Button className="mt-4" variant="outline">
              Download CV
            </Button>
          </div>
          <div className="flex-1 max-w-fit p-4 border-2 border-dashed  rounded-md h-full flex-wrap">
            <p className="w-full overflow-hidden max-w-full max-h-full flex flex-wrap text-muted-foreground">
              {summary ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default HeroLayout;
