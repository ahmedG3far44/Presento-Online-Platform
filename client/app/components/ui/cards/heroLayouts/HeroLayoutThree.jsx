import { cn } from "@/lib/utils";
import ContactsCard from "../ContactsCard";
import Image from "next/image";

import GradientText from "./GradientText";
import ResumeDownloadBtn from "../ResumeDownloadBtn";
import UploadImage from "../../profile/forms/UploadImage";

function HeroLayoutThree({
  name,
  summary,
  img,
  jobTitle,
  edit,
  contacts,
  isLogged,
  id,
}) {
  return (
    <section className={"hero_section"}>
      <div className="hero_img">
        <Image
          priority
          height={320}
          width={320}
          src={
            !!img
              ? img
              : "https://th.bing.com/th/id/OIP.AkKR5-4AJhHTNNDMp0NxvQAAAA?rs=1&pid=ImgDetMain"
          }
          alt="hero section image "
          className="img "
        />
        {isLogged && (
          <UploadImage
            id={id}
            className="upload_img"
            fileFormName={"hero-image"}
            url={`upload-image/${id}`}
            acceptedTypes={"image"}
          />
        )}
      </div>

      <div className="flex flex-col justify-start items-start max-sm:justify-center max-md:justify-center max-sm:items-center max-md:items-center gap-2  w-full p-8  max-md:p-2">
        <div className="hero_info">
          <h1 className="hero_heading_text">
            {!!name ? name : "change your name..."}
          </h1>
          <h2 className="hero_secondary_text">
            {!!jobTitle ? jobTitle : "change your Job Title...."}
          </h2>
          <ContactsCard contacts={contacts} />
          <ResumeDownloadBtn />
        </div>

        <div className="about_text max-w-3/4">
          <summary className="overflow-hidden">
            {!!summary
              ? summary
              : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </summary>
        </div>
      </div>
    </section>
  );
}

export default HeroLayoutThree;
