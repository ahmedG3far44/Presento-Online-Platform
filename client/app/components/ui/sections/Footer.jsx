import credentials from "@/app/credentials/credentials";
import Image from "next/image";
import Link from "next/link";
import ContactsCard from "../cards/ContactsCard";
import Container from "../containers/Container";

async function Footer({ userInfo }) {
  const year = new Date().getFullYear();
  const contacts = await (
    await fetch(`http://localhost:4000/api/${userInfo?.id}/contacts`)
  ).json();
  return (
    <footer className="footer">
      <Container className="w-full flex justify-start  flex-wrap  gap-4 items-center">
        <div className="flex  justify-center items-center gap-2 ">
          <Image
            className="rounded-full border-2 max-w-10 max-h-10 overflow-hidden"
            src={userInfo?.picture}
            alt={"profile user picture"}
            width={40}
            height={40}
          />
          <h1 className="text-nowrap mr-10">{userInfo?.name}</h1>
        </div>

        <div className="flex flex-1">
          <ContactsCard contacts={contacts} />
        </div>

        <div className="">
          <span> &copy; all rights are reserved {year} to the creator </span>
          <Link
            className="gradient_text_sm"
            target="_blank"
            href="https://www.linkedin.com/in/ahmed-gaafar-5a3478201/"
          >
            ahmedG3far44
          </Link>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
