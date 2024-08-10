import Link from "next/link";
import credentials from "@/app/credentials/credentials";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

async function Header() {
  const { user, isLogged } = await credentials();
  const { getPermission } = await getKindeServerSession();
  const admin = await getPermission("admin:create");
  return (
    <header className="w-3/4 m-auto p-4 flex justify-between items-center">
      <div className="flex-1 ">
        <div className="w-full flex justify-center items-center gap-4">
          <Image
            src={user?.picture}
            width={40}
            height={40}
            alt="profile user image"
            className="rounded-full border "
          />
          <h1>{user?.given_name}</h1>
        </div>
      </div>
      <nav className="flex-1 flex  justify-center items-center gap-4 ">
        <Link href={`/${user.id}/#about`}>About</Link>
        <Link href={`/${user.id}/#experiences`}>Experiences</Link>
        <Link href={`/${user.id}/#projects`}>Projects</Link>
        <Link href={`/${user.id}/#skills`}>Skills</Link>
      </nav>
      {isLogged ? (
        <div className="flex-1 flex justify-center items-center gap-4">
          {admin.isGranted && isLogged ? (
            <Link
              className="duration-150 bg-black text-white p-2 rounded-md"
              href={`/${user.id}/dashboard`}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              className="hover:text-purple-500 duration-150"
              href={`/${user.id}/profile`}
            >
              Profile
            </Link>
          )}
          <LogoutLink className="hover:text-purple-500 duration-150">
            logout
          </LogoutLink>
        </div>
      ) : (
        <button>Share</button>
      )}
    </header>
  );
}

export default Header;
