import credentials from "@/app/credentials/credentials";
import Image from "next/image";
import Link from "next/link";
import ContactsCard from "../cards/ContactsCard";
import Container from "../containers/Container";

async function Footer() {
  const { user } = await credentials();
  const year = new Date().getFullYear();
  const contacts = await (
    await fetch(`http://localhost:4000/api/${user?.id}/contacts`)
  ).json();
  return (
    <footer className="w-full bg-primary-foreground flex justify-center items-center overflow-x-hidden">
      <Container>
        <div className="w-full flex justify-evenly items-center">
          <div className="flex  justify-center items-center gap-2 ">
            <Image
              className="rounded-full border-2 max-w-10 max-h-10 overflow-hidden"
              src={user?.picture}
              alt={"profile user picture"}
              width={40}
              height={40}
            />
            <h1 className="text-nowrap mr-10">
              {user?.given_name + " " + user?.family_name}
            </h1>
          </div>

          <div className="flex flex-1">
            <ContactsCard contacts={contacts} />
          </div>

          <div className="flex  justify-center items-center gap-2 ml-auto">
            <span> &copy; all rights are reserved {year} to the </span>
            <div>
              creator{" "}
              <Link className="text-purple-500 hover:underline" href="/">
                ahmedG3far44
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
