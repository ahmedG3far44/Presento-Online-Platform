import Link from "next/link";

import credentials from "@/app/credentials/credentials";
import User from "../cards/User";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function Header() {
  const { user, isLogged } = await credentials();
  const { getPermission } = await getKindeServerSession();
  const admin = await getPermission("admin:create");
  return (
    <header className="w-3/4 m-auto p-4 flex justify-between items-center">
      <div className="flex-1">
        <User name={user.given_name} picture={user.picture} />
      </div>
      <nav className="flex-1 flex  justify-center items-center gap-4 ">
        <Link href={""}>Home</Link>
        <Link href={""}>Projects</Link>
        <Link href={""}>Settings</Link>
        <Link href={""}>Home</Link>
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
              Settings
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
