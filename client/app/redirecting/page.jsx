import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import "../globals.css";

const verifyUser = async (user) => {
  try {
    const request = await fetch("http://localhost:4000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = request.json();
    return data;
  } catch (error) {
    return error.message;
  }
};
async function RedirectingPage() {
  const { getUser, getPermission } = await getKindeServerSession();
  const isAdmin = await getPermission("admin:create");

  const { id, given_name, family_name, picture, email } = await getUser();
  await verifyUser({
    id,
    given_name,
    family_name,
    email,
    picture,
    role: "user",
  }).then((res) => {
    console.log(res);
    if (res.role === "user") {
      redirect(`/${res.id}/profile`);
    } else {
      redirect(`/${id}/dashboard`);
    }
  });
  console.log(picture);
  return <div> {given_name} redirecting...</div>;
}

export default RedirectingPage;
