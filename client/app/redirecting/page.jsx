import { redirect } from "next/navigation";
import credentials from "../credentials/credentials";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
async function RedirectingPage() {
  const { user } = await credentials();
  const { getPermission, isAuthenticated } = await getKindeServerSession();
  const admin = await getPermission("admin:create");
  const isLogged = await isAuthenticated();
  if (isLogged) {
    // if user in db
    if (admin.isGranted) {
      redirect(`/${user.id}/dashboard`);
    } else {
      redirect(`/${user.id}/profile`);
    }
  } else {
    redirect(`/api/auth/login`);
  }
  return (
    <div className="w-screen h-screen flex justify-center items-start">
      <div className="mt-40 w-fit p-4 rounded-md flex justify-center items-center gap-4 bg-gray-200">
        <LoadingSpinner />
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <Image
            src={user.picture}
            width={40}
            height={40}
            className="rounded-full object-cover"
            alt="profile image"
          />
        </div>
        {`${user.given_name}`} redirecting
        <DotLoading />
      </div>
    </div>
  );
}
function LoadingSpinner() {
  return (
    <div className="w-6 h-6 bg-gray-200 rounded-full ">
      <div className="w-full h-full border border-teal-500 rounded-full border-l-transparent border-r-transparent spin"></div>
    </div>
  );
}
function DotLoading() {
  return (
    <div className="m-0 flex justify-start items-end gap-1">
      <span className="w-1 h-1 bg-gray-400 rounded-full fade-1"></span>
      <span className="w-1 h-1 bg-gray-400 rounded-full fade-2 "></span>
      <span className="w-1 h-1 bg-gray-400 rounded-full fade-3 "></span>
    </div>
  );
}

export default RedirectingPage;
