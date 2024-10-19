import Image from "next/image";
import Badge from "./Badge";

function User({ name, picture, isAdmin }) {
  return (
    <div className="w-full flex  justify-center items-center   gap-4 max-sm:flex-col max-md:flex-col">
      <Image
        src={
          !picture
            ? "https://superstarsculture.com/wp-content/uploads/2023/10/unknown-1-3.jpg"
            : picture
        }
        width={40}
        height={40}
        alt="user profile picture"
        className="rounded-full overflow-hidden border object-cover "
      />

      <div className="w-full flex flex-col justify-start items-start gap-2 flex-wrap max-sm:justify-center max-md:justify-center max-sm:items-center max-md:items-center">
        <h3 className="text-sm text-start text-wrap font-bold max-sm:text-center max-md:text-center">
          {name.toUpperCase()}
        </h3>
        <Badge text={isAdmin ? "admin" : "user"} />
      </div>
    </div>
  );
}

export default User;
