import Image from "next/image";
import NoImage from "@/public/noImage.png";
function SkillCard({ skillName, skillLogo }) {
  return (
    <div className="flex justify-center items-center gap-4 m-2">
      <Image
        src={skillLogo || NoImage}
        width={40}
        height={40}
        alt="skill logo"
      />
      <h1 className="text-2xl">{skillName.toUpperCase()}</h1>
    </div>
  );
}

export default SkillCard;
