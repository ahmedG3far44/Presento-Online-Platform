"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userSchema } from "@/lib/schema";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import "../globals.css";

function RedirectingPage() {
  const router = useRouter();
  const { user, isAuthenticated, getPermission } = useKindeBrowserClient();
  const isAdmin = getPermission("create:admin").isGranted;
  const validUser = userSchema.safeParse(user);
  const redirectUser = async (validUser) => {
    const req = await fetch("http://localhost:4000/api/user", {
      method: "POST",
      body: JSON.stringify(validUser),
    });
    const data = req.json();
    console.log(data);
  };
  useEffect(() => {
    user ? redirectUser(user) : null;
  }, [user]);
  return (
    <div className="w-screen h-screen flex justify-center items-start">
      <div className="mt-40 w-fit p-4 rounded-md flex justify-center items-center gap-4 border ">
        <LoadingSpinner />
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <Image
            src={user?.picture}
            width={40}
            height={40}
            className="rounded-full object-cover"
            alt="profile image"
          />
        </div>
        {`${user?.given_name}`} redirecting...
        <DotLoading />
      </div>
    </div>
  );
}
function LoadingSpinner() {
  return (
    <div className="w-6 h-6  rounded-full ">
      <div className="w-full h-full border-2 rounded-full border-l-transparent border-r-transparent spin"></div>
    </div>
  );
}
function DotLoading() {
  return (
    <div className="m-0 flex justify-start items-end gap-1">
      <span className="w-1 h-1 rounded-full fade-1"></span>
      <span className="w-1 h-1 rounded-full fade-2 "></span>
      <span className="w-1 h-1 rounded-full fade-3 "></span>
    </div>
  );
}

export default RedirectingPage;
