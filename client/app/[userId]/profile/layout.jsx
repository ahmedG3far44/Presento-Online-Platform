"use client";
import Link from "next/link";
import { TbInfoSquareRounded } from "react-icons/tb";
import { LuLayoutGrid } from "react-icons/lu";
import { LuLayers } from "react-icons/lu";
import { LuLaptop2 } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import User from "@/app/components/ui/cards/User";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { TbSmartHome } from "react-icons/tb";
import { useParams, usePathname } from "next/navigation";
import "../../globals.css";

function layout({ children }) {
  // console.log(path);
  const { getUser, getPermission } = useKindeBrowserClient();
  const user = getUser();
  const isAdmin = getPermission("admin:create").isGranted;

  const pathName = usePathname();
  const { userId } = useParams();
  // console.log(searchParams);
  const profileRoutes = [
    {
      path: `/${userId}`,
      name: "Home",
      icon: <TbSmartHome size={20} />,
    },
    {
      path: `/${userId}/profile/bio`,
      name: "Bio",
      icon: <TbInfoSquareRounded size={20} />,
    },
    {
      path: `/${userId}/profile/experiences`,
      name: "Experiences",
      icon: <LuLayers size={20} />,
    },
    {
      path: `/${userId}/profile/projects`,
      name: "Projects",
      icon: <LuLayoutGrid size={20} />,
    },
    {
      path: `/${userId}/profile/skills`,
      name: "Skills",
      icon: <LuLaptop2 size={20} />,
    },
  ];
  return (
    <div className="max-w-full w-full flex justify-start items-start overflow-x-hidden relative">
      <aside className="flex-1 p-8  h-screen min-h-full fixed  left-0 top-0 flex flex-col justify-between items-center gap-8 bg-primary-foreground">
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
              const activeRoute = pathName.split("/")[3];
              return (
                <li
                  key={index}
                  className="w-full flex justify-start items-center gap-10 p-2 hover:text-muted-foreground duration-150"
                >
                  <Link
                    className={`w-full flex gap-2 px-4 p-2 rounded-md ${
                      activeRoute === route.name.toLocaleLowerCase() &&
                      "bg-muted"
                    }`}
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
        <div className="w-full flex flex-col justify-start items-start gap-8 ">
          <ModeToggle className={"bg-primary-foreground"} />
          <LogoutLink className="w-full flex gap-2 hover:text-purple-500 duration-150">
            <span>
              <LuLogOut size={20} />
            </span>
            logout
          </LogoutLink>
        </div>
      </aside>

      <main className="w-3/4 self-end overflow-x-hidden no-scrollbar  ml-auto mr-20 ">
        {children}
      </main>
    </div>
  );
}

export default layout;
