import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import credentials from "../../../credentials/credentials";
import Image from "next/image";
import Link from "next/link";
import { LuActivity, LuDribbble, LuGithub, LuLinkedin } from "react-icons/lu";
import { ModeToggle } from "../../../../components/dark-mode-toggle";

async function LandingPage() {
  const { isLogged, user, isAdmin } = await credentials();
  const featuresCard = [
    {
      icon: <LuActivity size={20} />,
      title: "feature name",
      text: "very good",
    },
    {
      icon: <LuActivity size={20} />,
      title: "feature name",
      text: "very good",
    },
    {
      icon: <LuActivity size={20} />,
      title: "feature name",
      text: "very good",
    },
    {
      icon: <LuActivity size={20} />,
      title: "feature name",
      text: "very good",
    },
    {
      icon: <LuActivity size={20} />,
      title: "feature name",
      text: "very good",
    },
  ];
  const year = new Date().getFullYear();

  return (
    <>
      <main className="w-3/4 max-md:w-full m-auto flex flex-col justify-center items-center gap-4 relative p-4">
        <header className="flex justify-around items-center w-full p-4">
          <h1 className={"text-3xl font-mono font-bold"}>PRESENTO.io</h1>
          <div className="w-1/4 p-4 flex gap-4">
            <div className="flex justify-center items-center gap-4">
              <ModeToggle theme={"none"} />
              <Link
                className="hover:text-purple-500 duration-150 cursor-pointer"
                href={`/${user.id}`}
              >
                {user.given_name}
              </Link>
              <Image
                className="w-8 h-8 min-w-8 min-h-8 object-cover rounded-full overflow-hidden"
                src={user.picture}
                width={30}
                height={30}
              />
              {isLogged ? (
                <LogoutLink className="max-md:hidden">Logout</LogoutLink>
              ) : (
                <div>
                  <LoginLink className="primary_button">Login</LoginLink>
                  <RegisterLink className="secondary_button">
                    Sign Up
                  </RegisterLink>
                </div>
              )}
            </div>
          </div>
        </header>
        <section className={"w-full p-8 vertical gap-4 mt-10 relative"}>
          <div className="vertical gap-4 z-30">
            <span>
              <img
                src={
                  "https://img.icons8.com/?size=100&id=YUVJisIqcRmG&format=png&color=000000"
                }
                width={40}
                height={40}
                autoPlay
                alt={"icons hero section"}
              />
            </span>
            <h1 className={"heading_text "}>
              Build your dream portfolio effortlessly. Our intuitive platform
              lets you showcase your projects and experiences in a stunning,
              customizable way.
            </h1>
            <h2 className={"secondary_text"}>
              Our user-friendly interface makes it a breeze to create and
              customize your portfolio.
            </h2>
            <div className="flex justify-center items-center gap-4 my-4">
              <div className="flex justify-center items-center gap-2">
                <span>
                  <LuGithub size={20} />
                </span>
                <h1>Github</h1>
              </div>
              <div className="flex justify-center items-center gap-2">
                <span>
                  <LuLinkedin size={20} />
                </span>
                <h1>Linkedin</h1>
              </div>
              <div className="flex justify-center items-center gap-2">
                <span>
                  <LuDribbble size={20} />
                </span>
                <h1>Instagram</h1>
              </div>
            </div>
            <button className={"cta_button text-white"}>Get Started Now</button>
          </div>
          <span className={"gradient_shape_one  "}></span>
          <span className={"gradient_shape_two  "}></span>
        </section>
        {/* <span className="h-24 bg-card w-screen"></span> */}
        <section className={"vertical gap-8 w-full"}>
          <h1 className="heading_text text-center">What you will got ?? </h1>
          <div
            className={
              "w-full grid grid-cols-3 grid-flow-row gap-4 max-md:grid-cols-1"
            }
          >
            {featuresCard.map((feature, index) => {
              return (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  text={feature.text}
                />
              );
            })}
          </div>
        </section>
        <section className={"vertical gap-8 my-8"}>
          <h1 className="heading_text">Showcasing our features</h1>
          <video
            className="rounded-2xl "
            src="https://cdn.dribbble.com/userupload/14312388/file/original-c2e734f2d13d5bc3b2766cd6034d90e3.mp4"
            loop
            muted
            autoPlay
            //   playsInline
            preload={"true"}
            width={800}
          ></video>
        </section>
        <section className={"bg-secondary"}></section>
      </main>
      <footer
        className={
          " w-full flex justify-around items-center m-auto bg-secondary p-8"
        }
      >
        <h1 className="text-3xl font-bold">Presento.io</h1>
        <p>
          <span className="mr-2">{year}</span>
          designed & created by{" "}
          <Link
            className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 via-orange-500"
            target={"_bland"}
            href={""}
          >
            @ahmedG3far44
          </Link>
        </p>
      </footer>
    </>
  );
}

export function FeatureCard({ icon, title, text }) {
  return (
    <div className="p-4 bg-card rounded-md border flex flex-col justify-start items-start gap-2 max-md:justify-center max-md:items-center">
      <span>{icon}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}

export default LandingPage;
