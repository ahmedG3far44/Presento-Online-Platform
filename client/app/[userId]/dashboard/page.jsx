import credentials from "@/app/credentials/credentials";
import { redirect } from "next/navigation";
async function Dashboard() {
  const { user, isAdmin, isLogged } = await credentials();
  {
    isAdmin && isLogged ? (
      <div className="max-w-screen max-h-screen">
        <h1>Dashboard</h1>
      </div>
    ) : (
      redirect(`/${user?.id}`)
    );
  }
}
export default Dashboard;
