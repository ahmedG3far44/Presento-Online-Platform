import Link from "next/link";
import { LuLaptop2 } from "react-icons/lu";
import { MdOutlineInsights } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { LuMailPlus } from "react-icons/lu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import User from "@/app/components/ui/cards/User";
import credentials from "@/app/credentials/credentials";
import { ModeToggle } from "@/components/dark-mode-toggle";

async function layout({ children }) {
  const { user, isAdmin } = await credentials();
  const dashboardRoutes = [
    {
      path: `/${user?.id}/dashboard/users`,
      name: "Users",
      icon: <LuUsers2 size={20} />,
    },
    {
      path: `/${user?.id}/dashboard/analysis`,
      name: "Analysis",
      icon: <MdOutlineInsights size={20} />,
    },
    {
      path: `/${user?.id}/dashboard/skills`,
      name: "Skills",
      icon: <LuLaptop2 size={20} />,
    },
    {
      path: `/${user?.id}/dashboard/contacts`,
      name: "Contacts",
      icon: <LuMailPlus size={20} />,
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
            {dashboardRoutes.map((route, index) => {
              return (
                <li
                  key={index}
                  className="w-full flex justify-start items-center gap-10 p-2 hover:text-purple-500 duration-150"
                >
                  <Link className={`w-full flex gap-2`} href={route.path}>
                    <span>{route?.icon}</span>
                    {route?.name}
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

      <main className="w-full p-8">{children}</main>
    </div>
  );
}
export default layout;
