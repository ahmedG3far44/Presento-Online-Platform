import { redirect } from "next/navigation";
import credentials from "@/app/credentials/credentials";

async function Profile() {
  const { isAdmin, isLogged } = await credentials();
  {
    !isAdmin && isLogged ? (
      <div className="sticky left-0 top-0 max-w-screen max-h-screen">
        <h1>Profile</h1>
      </div>
    ) : (
      redirect("/api/auth/login")
    );
  }
}

export default Profile;
