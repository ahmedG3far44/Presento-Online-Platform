import Link from "next/link";
import { TbInfoSquareRounded } from "react-icons/tb";
import { LuMail } from "react-icons/lu";
import { LuLayoutGrid } from "react-icons/lu";
import { LuLayers } from "react-icons/lu";
import { LuLaptop2 } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import User from "@/app/components/ui/cards/User";
import credentials from "@/app/credentials/credentials";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { TbSmartHome } from "react-icons/tb";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";

async function layout({ children, searchParams }) {
  // console.log(path);
  const { user, isAdmin } = await credentials();
  // console.log(searchParams);
  const profileRoutes = [
    {
      path: `/${user?.id}`,
      name: "Home",
      icon: <TbSmartHome size={20} />,
    },
    {
      path: `/${user?.id}/profile/bio`,
      name: "Bio",
      icon: <TbInfoSquareRounded size={20} />,
    },
    {
      path: `/${user?.id}/profile/experiences`,
      name: "Experiences",
      icon: <LuLayers size={20} />,
    },
    {
      path: `/${user?.id}/profile/projects`,
      name: "Projects",
      icon: <LuLayoutGrid size={20} />,
    },
    {
      path: `/${user?.id}/profile/skills`,
      name: "Skills",
      icon: <LuLaptop2 size={20} />,
    },
    {
      path: `/${user?.id}/profile/contacts`,
      name: "Contacts",
      icon: <LuMail size={20} />,
    },
  ];
  return (
    <div className="max-w-screen w-screen flex justify-start items-start gap-4">
      <aside className="flex-1 p-8  h-screen min-h-screen sticky  left-0 top-0 flex flex-col justify-between items-center gap-8  border-r">
        <div className="w-full flex flex-col justify-center items-center gap-20">
          <div className="w-full self-center mx-auto">
            <User
              name={`${user?.given_name} ${user?.family_name}`}
              picture={user?.picture}
              email={user?.email}
              isAdmin={isAdmin}
            />
          </div>

          <ul className="w-full flex flex-col self-center mx-auto">
            {profileRoutes.map((route, index) => {
              return (
                <li
                  key={index}
                  className="w-full flex justify-start items-center gap-10 p-2 hover:text-purple-500 duration-150"
                >
                  <Link
                    className={`w-full flex gap-2
                      ${
                        route?.name.toLocaleLowerCase() === "experiences"
                          ? "text-purple-500"
                          : null
                      } `}
                    href={route.path}
                  >
                    <span>{route.icon}</span>
                    {route.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-8">
          <ModeToggle />
          <LogoutLink className="w-full flex gap-2 hover:text-purple-500 duration-150">
            <span>
              <LuLogOut size={20} />
            </span>
            logout
          </LogoutLink>
        </div>
      </aside>

      <main className="w-full">{children}</main>
    </div>
  );
}

export default layout;
