import Link from "next/link";
import credentials from "@/app/credentials/credentials";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LuBell } from "react-icons/lu";
import Image from "next/image";

async function Header({ userInfo }) {
  const { isLogged } = await credentials();
  const { getPermission } = await getKindeServerSession();
  const admin = await getPermission("admin:create");
  return (
    <header className="w-3/4 m-auto p-4 flex justify-between items-center max-sm:w-screen ">
      <div className="flex-1 mr-10">
        <div className="w-full flex justify-center items-center gap-4">
          <Image
            src={userInfo?.picture}
            width={40}
            height={40}
            alt="profile user image"
            className="w-10 h-10 rounded-full border-2 "
          />
          <h1 className="text-muted-foreground">{userInfo?.name}</h1>
        </div>
      </div>
      <nav
        className={`flex-1 flex  items-center gap-4 mr-10 max-sm:hidden max-md:hidden ${
          isLogged ? "justify-end" : "justify-center"
        }`}
      >
        <Link href={`/${userInfo?.id}/#about`}>About</Link>
        <Link href={`/${userInfo?.id}/#experiences`}>Experiences</Link>
        <Link href={`/${userInfo?.id}/#projects`}>Projects</Link>
        <Link href={`/${userInfo?.id}/#skills`}>Skills</Link>
      </nav>
      {isLogged ? (
        <div className="flex-1 flex justify-center items-center gap-4">
          {admin?.isGranted && isLogged ? (
            <Link
              className="duration-150 bg-black text-white p-2 rounded-md"
              href={`/${userInfo?.id}/dashboard/users`}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                className="hover:text-muted-foreground duration-150"
                href={`/${userInfo?.id}/profile/bio`}
              >
                Profile
              </Link>
            </>
          )}
          <LogoutLink className="hover:text-muted-foreground duration-150">
            logout
          </LogoutLink>
          <div className={"relative"}>
            <div
              className={"text-muted-foreground relative cursor-pointer group"}
            >
              <LuBell size={20} />
              <span
                className={
                  "w-2 h-2 rounded-full bg-purple-500 absolute top-0 right-0"
                }
              ></span>
            </div>
            <ul
              className={
                "p-2 rounded-md border hidden group group-hover:flex shadow-md flex-col justify-start items-start gap-2 absolute top-10 right-0"
              }
            >
              <li>notifications</li>
              <li>notifications</li>
              <li>notifications</li>
              <li>notifications</li>
            </ul>
          </div>
        </div>
      ) : (
        <button>Share</button>
      )}
    </header>
  );
}

export default Header;
