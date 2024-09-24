import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import credentials from "./credentials/credentials";
import Container from "./components/ui/containers/Container";
import LandingPage from "./components/ui/landing page/LandingPage";

export default async function Home() {
  const { isAdmin, user, isLogged } = await credentials();

  return <LandingPage />;
}
