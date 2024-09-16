import HeroLayoutOne from "./heroLayouts/HeroLayoutOne";
import HeroLayoutTwo from "./heroLayouts/HeroLayoutTwo";
import HeroLayoutThree from "./heroLayouts/HeroLayoutThree";
import HeroLayoutFour from "./heroLayouts/HeroLayoutFour";
import HeroLayoutFive from "./heroLayouts/HeroLayoutFive";

function HeroLayout({
  id,
  name,
  summary,
  img,
  layoutStyle,
  jobTitle,
  contacts,
  isLogged,
}) {
  return (
    <>
      {layoutStyle === "1" && (
        <HeroLayoutOne
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
          isLogged={isLogged}
          id={id}
        />
      )}
      {layoutStyle === "2" && (
        <HeroLayoutTwo
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
          isLogged={isLogged}
          id={id}
        />
      )}
      {layoutStyle === "3" && (
        <HeroLayoutThree
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
          isLogged={isLogged}
          id={id}
        />
      )}
      {layoutStyle === "4" && (
        <HeroLayoutFour
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
          isLogged={isLogged}
          id={id}
        />
      )}
      {layoutStyle === "5" && (
        <HeroLayoutFive
          name={name}
          summary={summary}
          img={img}
          contacts={contacts}
          jobTitle={jobTitle}
          isLogged={isLogged}
          id={id}
        />
      )}
    </>
  );
}

export default HeroLayout;
