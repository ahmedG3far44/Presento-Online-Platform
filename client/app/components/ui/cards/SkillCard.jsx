import Image from "next/image";
import NoImage from "@/public/noImage.png";
function SkillCard({ skillName, skillLogo, layoutStyle }) {
  return (
    <>
      <div
        className={`
          ${layoutStyle === "1" && "flex justify-start items-center gap-2"}
          ${
            layoutStyle === "2" &&
            "flex flex-col rounded-md  justify-center bg-primary-foreground items-center gap-2 border p-4 hover:bg-primary-foreground"
          }
          ${
            layoutStyle === "3" &&
            "flex justify-around items-center gap-4 border rounded-md p-4 "
          }
          ${
            layoutStyle === "4" &&
            "w-full flex justify-start items-center gap-4"
          }
            ${layoutStyle === "5" && "flex justify-start items-center gap-4"}
        `}
      >
        <Image
          className={`max-w-full max-h-full object-cover rounded-md overflow-hidden
              ${layoutStyle === "3" && "block"}
              ${layoutStyle === "5" && "hidden"}
              `}
          src={skillLogo || NoImage}
          width={40}
          height={40}
          alt="skill logo"
        />
        <h1
          className={` 
            ${layoutStyle === "3" && "hidden"}
            ${
              layoutStyle === "5" &&
              "text-2xl text-muted-foreground font-bold border-l-2 px-4"
            }
            ${layoutStyle === "4" && "text-2xl text-muted-foreground"}
            `}
        >
          {skillName.toUpperCase()}
        </h1>
      </div>
    </>
  );
}

export default SkillCard;
