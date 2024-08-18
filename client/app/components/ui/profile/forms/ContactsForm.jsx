"use client";
import { useToast } from "@/components/ui/use-toast";
import { contactsSchema } from "@/lib/schema";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function ContactsForm({ contacts, setContacts }) {
  const { toast } = useToast();
  const status = useFormStatus();
  const [updateContactsState, setUpdateContacts] = useState(true);
  const updateContactsUrl = async (e) => {
    e.preventDefault();
    console.log(contacts);
    try {
      const validContactsData = contactsSchema.safeParse(contacts);
      if (!validContactsData?.success) {
        console.log(validContactsData.error.flatten().fieldErrors);
        return {
          errors: validContactsData.error.flatten().fieldErrors,
        };
      }
      const request = await fetch(
        `http://localhost:4000/api/${contacts?.usersId}/contacts/${contacts?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validContactsData?.data),
        }
      );
      if (!request.ok) {
        toast({
          title: "update contacts request error",
        });
      }
      const data = request.json();
      setUpdateContacts(true);
      data.then((res) => {
        toast({
          description: res.message,
        });
      });
      return data;
    } catch (error) {
      toast({
        title: "connection error",
        description: error.message,
      });
    }
  };
  return (
    <>
      <button
        className="px-4 py-2 hover:bg-muted border rounded-md"
        onClick={() => setUpdateContacts(!updateContactsState)}
      >
        {updateContactsState ? "update" : "updating..."}
      </button>
      <form
        onSubmit={updateContactsUrl}
        className="w-1/2 border p-4 mt-4 rounded-md flex flex-col justify-start items-center gap-2"
      >
        <input
          readOnly={updateContactsState}
          onChange={(e) => setContacts({ ...contacts, github: e.target.value })}
          className="w-full p-2 rounded-md read-only:bg-muted read-only:cursor-not-allowed"
          type="url"
          placeholder="Github profile link"
          defaultValue={contacts?.github}
        />
        <input
          readOnly={updateContactsState}
          onChange={(e) =>
            setContacts({ ...contacts, linkedin: e.target.value })
          }
          className="w-full p-2 rounded-md read-only:bg-muted read-only:cursor-not-allowed"
          type="url"
          placeholder="Linkedin profile link"
          defaultValue={contacts?.linkedin}
        />
        <input
          readOnly={updateContactsState}
          onChange={(e) =>
            setContacts({ ...contacts, youtube: e.target.value })
          }
          className="w-full p-2 rounded-md read-only:bg-muted read-only:cursor-not-allowed"
          type="url"
          placeholder="Youtube channel link "
          defaultValue={contacts?.youtube}
        />
        <input
          readOnly={updateContactsState}
          onChange={(e) =>
            setContacts({ ...contacts, twitter: e.target.value })
          }
          className="w-full p-2 rounded-md read-only:bg-muted read-only:cursor-not-allowed"
          type="url"
          placeholder="twitter profile link "
          defaultValue={contacts?.twitter}
        />
        <input
          type="submit"
          disabled={status.pending}
          value={status.pending ? "saving..." : "save changes"}
          className="w-full px-4 py-2 hover:bg-primary-foreground duration-150 cursor-pointer rounded-md disabled:bg-zinc-600 disabled:cursor-not-allowed  text-white border "
        />
      </form>
    </>
  );
}

export default ContactsForm;
