"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function credentials() {
  const { getUser, isAuthenticated, getPermission } =
    await getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("admin:create");
  const isLogged = await isAuthenticated();
  return {
    user,
    isLogged,
    isAdmin: permission?.isGranted,
  };
}
