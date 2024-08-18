import Link from "next/link";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineYoutube,
} from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";

function ContactsCard({ contacts }) {
  return (
    <div className="flex justify-start items-center gap-2 py-2 w-full">
      {contacts?.twitter && (
        <div
          className={
            "flex justify-center items-center p-1 rounded-md border scale-90 hover:scale-100  duration-150"
          }
        >
          <Link target="_blank" href={contacts?.twitter}>
            <span>
              <RiTwitterXFill size={20} />
            </span>
          </Link>
        </div>
      )}
      {contacts?.linkedin && (
        <div
          className={
            "flex justify-center items-center p-1 rounded-md border scale-90 hover:scale-100  duration-150"
          }
        >
          <Link target="_top" href={contacts?.linkedin}>
            <span>
              <AiOutlineLinkedin size={20} />
            </span>
          </Link>
        </div>
      )}
      {contacts?.youtube && (
        <div
          className={
            "flex justify-center items-center p-1 rounded-md border scale-90 hover:scale-100  duration-150"
          }
        >
          <Link target="_self" href={contacts?.youtube}>
            <span>
              <AiOutlineYoutube size={20} />
            </span>
          </Link>
        </div>
      )}
      {contacts?.github && (
        <div
          className={
            "flex justify-center items-center p-1 rounded-md border scale-90 hover:scale-100  duration-150"
          }
        >
          <Link target="_parent" href={contacts?.github}>
            <span>
              <AiOutlineGithub size={20} />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ContactsCard;

// 		"linkedin": "https://impolite-day.biz/",
// 		"github": "https://next-prostacyclin.info",
// 		"youtube": "https://agreeable-complex.org",
// 		"twitter": "https://peaceful-tiger.biz/",
// 		"usersId": "kp_95fdef745e5d43678ca77601e3cd3047"
