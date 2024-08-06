import Image from "next/image";

function User({ name, email, picture, isAdmin }) {
  return (
    <div className="w-full p-4 flex flex-col justify-start items-start gap-4 border rounded-md">
      <div className="flex  justify-center items-center gap-4">
        <div className="w-10 h-10 overflow-hidden rounded-full ">
          <Image
            src={picture}
            width={40}
            height={40}
            alt="user profile picture"
          />
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          <h3 className="w-full text-lsm text-nowrap font-semibold">
            {name.toUpperCase()}
          </h3>
          {email && <h6 className="text-sm text-nowrap">{email}</h6>}
        </div>
      </div>
      <div className="w-full flex justify-start items-center p-2 rounded-lg border">
        Role
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
