import ContactsCard from "../ContactsCard";
import Image from "next/image";
import GradientText from "./GradientText";
import ResumeDownloadBtn from "../ResumeDownloadBtn";
import UploadImage from "../../profile/forms/UploadImage";

function HeroLayoutOne({
  id,
  name,
  contacts,
  img,
  summary,
  jobTitle,
  isLogged,
}) {
  return (
    <section className="flex justify-center items-start gap-4 w-full">
      <div className={"hero_info"}>
        <h1 className="hero_heading_text">
          {!!name ? name : "change your name...."}
        </h1>
        <h3 className="hero_secondary_text">
          {!!jobTitle ? jobTitle : "change your job title..."}
        </h3>
        <ContactsCard contacts={contacts} />
        <ResumeDownloadBtn />
      </div>
      <div className={"hero_img"}>
        <Image
          priority
          height={320}
          width={320}
          src={
            !!img
              ? img
              : "https://th.bing.com/th/id/OIP.AkKR5-4AJhHTNNDMp0NxvQAAAA?rs=1&pid=ImgDetMain"
          }
          alt="hero section image"
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
      <div className="about_text max-w-3/4">
        <summary className="overflow-hidden">
          {!!summary
            ? summary
            : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
        </summary>
      </div>
    </section>
  );
}

export default HeroLayoutOne;
