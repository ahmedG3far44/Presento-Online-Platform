import ContactsCard from "../ContactsCard";
import Image from "next/image";
import GradientText from "./GradientText";
import ResumeDownloadBtn from "../ResumeDownloadBtn";
import UploadImage from "../../profile/forms/UploadImage";

function HeroLayoutFour({
  name,
  summary,
  img,
  jobTitle,
  contacts,
  isLogged,
  id,
}) {
  return (
    <section className={"hero_section"}>
      <div className="flex-1 flex flex-col justify-between max-sm:justify-center max-md:justify-center max-sm:items-center max-md:items-center  items-start gap-2">
        <div className="hero_info">
          <GradientText>{name || "your name"}</GradientText>
          <h3 className="secondary_text">
            {!!jobTitle ? jobTitle : "change your job title..."}
          </h3>
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

      <div className="hero_img">
        <Image
          height={320}
          width={320}
          src={
            !!img
              ? img
              : "https://th.bing.com/th/id/OIP.AkKR5-4AJhHTNNDMp0NxvQAAAA?rs=1&pid=ImgDetMain"
          }
          alt="hero section image "
          className="img"
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
    </section>
  );
}

export default HeroLayoutFour;
