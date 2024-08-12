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
import { Button } from "@/components/ui/button";

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
  // 		"linkedin": "https://impolite-day.biz/",
  // 		"github": "https://next-prostacyclin.info",
  // 		"youtube": "https://agreeable-complex.org",
  // 		"twitter": "https://peaceful-tiger.biz/",
  // 		"usersId": "kp_95fdef745e5d43678ca77601e3cd3047"

  return (
    <div className="w-full p-4 rounded-md flex flex-col justify-start items-start gap-8 border">
      <form className="w-full p-4 rounded-md flex flex-col justify-start items-center gap-2">
        <input
          onChange={(e) =>
            setContactObject({ ...contactObject, github: e.target.value })
          }
          className="w-full p-2 rounded-md"
          type="url"
          placeholder="Github profile link"
        />
        <input
          onChange={(e) =>
            setContactObject({ ...contactObject, linkedin: e.target.value })
          }
          className="w-full p-2 rounded-md"
          type="url"
          placeholder="Linkedin profile link"
        />
        <input
          onChange={(e) =>
            setContactObject({ ...contactObject, youtube: e.target.value })
          }
          className="w-full p-2 rounded-md "
          type="url"
          placeholder="Youtube channel link"
        />
        <input
          onChange={(e) =>
            setContactObject({ ...contactObject, twitter: e.target.value })
          }
          className="w-full p-2 rounded-md"
          type="url"
          placeholder="twitter profile link"
        />
        <Button
          type="submit"
          variant="outline"
          className="w-full px-4 py-2 rounded-md  text-white border "
        >
          save social links
        </Button>
      </form>
    </div>
  );
}

export default ContactsFrom;
