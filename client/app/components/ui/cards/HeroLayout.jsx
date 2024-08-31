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
        />
      )}
      {layoutStyle === "2" && (
        <HeroLayoutTwo
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
        />
      )}
      {layoutStyle === "3" && (
        <HeroLayoutThree
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
        />
      )}
      {layoutStyle === "4" && (
        <HeroLayoutFour
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
        />
      )}
      {layoutStyle === "5" && (
        <HeroLayoutFive
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
        />
      )}
    </>
  );
}

export default HeroLayout;
