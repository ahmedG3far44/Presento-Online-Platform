import Link from "next/link";
import credentials from "@/app/credentials/credentials";
import ShareBtn from "../cards/ShareBtn";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { ModeToggle } from "../../../../components/dark-mode-toggle";

async function Header({ userInfo }) {
  const { isLogged } = await credentials();
  const { getPermission } = await getKindeServerSession();
  const admin = await getPermission("admin:create");
  return (
    <header className="w-3/4 m-auto p-4 flex justify-center items-center   max-sm:w-full ">
      <div className="mr-auto">
        <div className="flex justify-start items-center gap-4">
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
        className={`flex  items-center gap-4 mr-10 max-sm:hidden max-md:hidden ${
          isLogged ? "justify-end" : "justify-center"
        }`}
      >
        <Link href={`/${userInfo?.id}/#about`}>About</Link>
        <Link href={`/${userInfo?.id}/#experiences`}>Experiences</Link>
        <Link href={`/${userInfo?.id}/#projects`}>Projects</Link>
        <Link href={`/${userInfo?.id}/#skills`}>Skills</Link>
      </nav>

      <div className="ml-auto ">
        {isLogged ? (
          <div className="flex-1 flex justify-center items-center gap-4">
            <ModeToggle theme={"none"} />
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

            <ShareBtn />
          </div>
        ) : (
          <ShareBtn />
        )}
      </div>
    </header>
  );
}

export default Header;
