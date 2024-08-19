"use client";
import { useState, useEffect } from "react";
import BioForm from "@/app/components/ui/profile/forms/BioForm";
import ContactsForm from "@/app/components/ui/profile/forms/ContactsForm";
import HeroLayout from "@/app/components/ui/cards/HeroLayout";
import { useParams, useRouter } from "next/navigation";

function BioPage() {
  const router = useRouter();
  const { userId } = useParams();
  const [bio, setBio] = useState();
  const [contacts, setContacts] = useState();
  const [switcher, setSwitcher] = useState("bio");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function getUserBio(userId) {
      const request = await fetch(`http://localhost:4000/api/${userId}/bio`);
      const userBio = await request.json();
      setBio({ ...userBio, layoutStyle: "4" });
    }
    async function getUserContacts(userId) {
      const request = await fetch(
        `http://localhost:4000/api/${userId}/contacts`
      );
      const userContacts = await request.json();
      setContacts(userContacts);
    }
    getUserBio(userId);
    getUserContacts(userId);
    router.refresh();

    setLoading(false);
  }, []);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4 overflow-x-hidden overflow-y-scroll no-scrollbar">
      <div className="w-3/4 m-auto  border-2 mt-4 border-dashed rounded-md">
        {isLoading ? (
          <div className="w-full h-full min-w-full min-h-[600px] flex justify-center items-center p-8">
            <h1 className="text-4xl text-muted-foreground">Loading...</h1>
          </div>
        ) : (
          <HeroLayout
            name={bio?.bioName}
            summary={bio?.bio}
            jobTitle={bio?.jobTitle}
            img={bio?.heroImage}
            layoutStyle={bio?.layoutStyle}
            edit={"edit"}
            contacts={contacts}
          />
        )}
      </div>
      <div className="w-3/4 m-auto ">
        <div className="w-full m-auto py-4 rounded-md flex gap-4 ">
          <button
            className={`px-4 py-2 w-52 min-w-52 border rounded-md text-primary cursor-pointer hover:bg-muted duration-150 ${
              switcher === "bio" && "bg-secondary"
            }`}
            onClick={() => setSwitcher("bio")}
          >
            Bio
          </button>
          <button
            className={`px-4 py-2 w-52 min-w-52 border rounded-md text-primary cursor-pointer hover:bg-muted duration-150 ${
              switcher === "contacts" && "bg-secondary"
            }`}
            onClick={() => setSwitcher("contacts")}
          >
            Contacts
          </button>
        </div>
        <div>
          {switcher === "bio" ? (
            <BioForm bio={bio} setBio={setBio} />
          ) : (
            <ContactsForm contacts={contacts} setContacts={setContacts} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BioPage;
