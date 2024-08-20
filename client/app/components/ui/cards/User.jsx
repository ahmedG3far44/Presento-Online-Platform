import Image from "next/image";

function User({ name, email, picture, isAdmin }) {
  return (
    <div className="w-full p-4 flex flex-col justify-start items-start gap-4 border rounded-md overflow-hidden">
      <div className="flex  justify-center items-center gap-4">
        <div className="w-10 h-10 overflow-hidden rounded-full ">
          <Image
            src={picture}
            width={40}
            height={40}
            alt="user profile picture"
          />
        </div>
        <div className="flex flex-col justify-start items-start gap-1 flex-wrap ">
          <h3 className="w-full text-lsm text-nowrap font-semibold">
            {name.toUpperCase()}
          </h3>
        </div>
      </div>
      <div className="w-full flex justify-center rounded-3xl items-center p-1 border  bg-muted text-primary">
        {isAdmin ? (
          <h1 className="ml-2 "> Admin</h1>
        ) : (
          <h1 className="ml-2 "> User</h1>
        )}
      </div>
    </div>
  );
}

export default User;
