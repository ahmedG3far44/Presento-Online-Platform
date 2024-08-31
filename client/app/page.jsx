import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import credentials from "./credentials/credentials";
import Container from "./components/ui/containers/Container";

export default async function Home() {
  const { isAdmin, user, isLogged } = await credentials();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-1/4 p-4 flex gap-4">
        {isLogged ? (
          <LogoutLink>Logout</LogoutLink>
        ) : (
          <div>
            <LoginLink>Sign in</LoginLink>
            <RegisterLink>Sign up</RegisterLink>
          </div>
        )}
      </div>
      <Container>
        <section className="w-full h-96 p-4 bg-blue-300">
          <h1>{String(isAdmin)}</h1>
          <h1>{String(isLogged)}</h1>
          <h1>
            {user?.email} {user?.given_name} {user?.picture}
          </h1>
        </section>
      </Container>
    </main>
  );
}
