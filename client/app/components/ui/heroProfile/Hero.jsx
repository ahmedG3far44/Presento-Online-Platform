"use client";
import HeroLayout from "../cards/HeroLayout";

function Hero({ bio, contacts }) {
  return (
    <section id="hero" className="w-full h-full p-4 border">
      <HeroLayout
        name={bio?.bioName}
        summary={bio?.bio}
        jobTitle={bio?.jobTitle}
        img={bio?.heroImage}
        layoutStyle={bio?.layoutStyle}
        contacts={contacts}
        edit={"preview"}
      />
    </section>
  );
}

export default Hero;
