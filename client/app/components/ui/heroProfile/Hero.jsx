"use client";
import HeroLayout from "../cards/HeroLayout";
import { ChangeHeroLayoutForm } from "../profile/forms/LayoutsForm";

function Hero({ bio, layouts, setLayouts, contacts, isLogged }) {
  return (
    <>
      {bio && (
        <section id="hero" className="w-full h-full">
          {isLogged && (
            <ChangeHeroLayoutForm layouts={layouts} setLayouts={setLayouts} />
          )}
          <HeroLayout
            id={bio?.id}
            name={bio?.bioName}
            summary={bio?.bio}
            jobTitle={bio?.jobTitle}
            img={bio?.heroImage}
            layoutStyle={layouts?.heroLayout}
            contacts={contacts}
            isLogged={isLogged}
            edit={"preview"}
          />
        </section>
      )}
    </>
  );
}

export default Hero;
