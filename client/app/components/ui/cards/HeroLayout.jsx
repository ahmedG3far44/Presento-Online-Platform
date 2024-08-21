import HeroLayoutOne from "./heroLayouts/HeroLayoutOne";
import HeroLayoutTwo from "./heroLayouts/HeroLayoutTwo";
import HeroLayoutThree from "./heroLayouts/HeroLayoutThree";
import HeroLayoutFour from "./heroLayouts/HeroLayoutFour";
import HeroLayoutFive from "./heroLayouts/HeroLayoutFive";

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
    <>
      {layoutStyle === "1" && (
        <HeroLayoutOne
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
          edit={edit}
        />
      )}
      {layoutStyle === "2" && (
        <HeroLayoutTwo
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
          edit={edit}
        />
      )}
      {layoutStyle === "3" && (
        <HeroLayoutThree
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
          edit={edit}
        />
      )}
      {layoutStyle === "4" && (
        <HeroLayoutFour
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
          edit={edit}
        />
      )}
      {layoutStyle === "5" && (
        <HeroLayoutFive
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
          edit={edit}
        />
      )}
    </>
  );
}

export default HeroLayout;
