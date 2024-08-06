"use client";
import {
  AiOutlineGithub,
  AiOutlineYoutube,
  AiOutlineDribbble,
  AiOutlineLinkedin,
  AiOutlineBehance,
} from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { useState } from "react";

function ContactsFrom() {
  const [contactObject, setContactObject] = useState({
    linkedin: "",
    github: "",
    dribble: "",
    youtube: "",
    twitter: "",
  });

  const [contacts, setContacts] = useState([
    {
      logo: <AiOutlineGithub size={20} />,
      name: "Github",
      added: true,
      value: "",
    },
    {
      logo: <AiOutlineLinkedin size={20} />,
      name: "Linkedin",
      added: false,
      value: "",
    },
    {
      logo: <AiOutlineBehance size={20} />,
      name: "Behance",
      added: false,
      value: "",
    },
    {
      logo: <AiOutlineDribbble size={20} />,
      name: "Dribble",
      added: false,
      value: "",
    },
    {
      logo: <RiTwitterXFill size={20} />,
      name: "Twitter",
      added: false,
      value: "",
    },
    {
      logo: <AiOutlineYoutube size={20} />,
      name: "Youtube",
      added: true,
      value: "",
    },
  ]);

  return (
    <div className="w-full p-8 flex flex-col justify-start items-start gap-8">
      <form className="w-96p-4 rounded-md flex flex-col justify-start items-center gap-2 ">
        <input
          onChange={(e) =>
            setContactObject({ ...contactObject, github: e.target.value })
          }
          className="w-full p-2 rounded-md bg-gray-200"
          type="url"
          placeholder="Github profile link"
        />
        <input
          onChange={(e) =>
            setContactObject({ ...contactObject, linkedin: e.target.value })
          }
          className="w-full p-2 rounded-md bg-gray-200"
          type="url"
          placeholder="Linkedin profile link"
        />
        <input
          onChange={(e) =>
            setContactObject({ ...contactObject, dribble: e.target.value })
          }
          className="w-full p-2 rounded-md bg-gray-200"
          type="url"
          placeholder="Dribble profile link"
        />
        <input
          onChange={(e) =>
            setContactObject({ ...contactObject, youtube: e.target.value })
          }
          className="w-full p-2 rounded-md bg-gray-200"
          type="url"
          placeholder="Youtube channel link"
        />
        <input
          onChange={(e) =>
            setContactObject({ ...contactObject, twitter: e.target.value })
          }
          className="w-full p-2 rounded-md bg-gray-200"
          type="url"
          placeholder="x social medial link"
        />
        <input
          type="submit"
          className="w-full px-4 py-2 rounded-md bg-purple-500 text-white "
          value={"save links"}
        />
      </form>
    </div>
  );
}

export default ContactsFrom;
