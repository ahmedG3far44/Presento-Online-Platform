import Image from "next/image";
import Badge from "./Badge";

function User({ name, picture, isAdmin }) {
  return (
    <div className="w-full flex  justify-center items-center   gap-4 max-sm:flex-col max-md:flex-col">
      <div className="w-8 h-8 min-w-8 min-h-8 overflow-hidden  rounded-full ">
        <Image
          src={picture}
          width={40}
          height={40}
          alt="user profile picture"
        />
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2 flex-wrap max-sm:justify-center max-md:justify-center max-sm:items-center max-md:items-center">
        <h3 className="w-full text-sm text-center text-wrap font-normal">
          {name.toUpperCase()}
        </h3>
        <Badge text={isAdmin ? "admin" : "user"} />
      </div>
    </div>
  );
}

export default User;
