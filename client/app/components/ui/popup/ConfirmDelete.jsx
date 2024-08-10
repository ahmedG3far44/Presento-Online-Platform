"use client";
import { Button } from "@/components/ui/button";
import { HiQuestionMarkCircle } from "react-icons/hi";

function ConfirmDelete({ deleteFunc, id, name, isOpen, setOpen }) {
  const handelDeleteItem = () => {
    console.log("confirm delete function is work ");
    // show toast message of deleting state
    // close popup form
    setOpen(!isOpen);
  };
  return (
    <div className="fixed w-full h-full bg-zinc-900 flex flex-col justify-center items-center z-50">
      <div className="w-96 h-auto p-4 bg-gray-400 rounded-md border shadow-md flex flex-col justify-center items-center gap-4">
        <span>
          <HiQuestionMarkCircle size={20} />
        </span>
        <p>
          are you sure you want to delete this {name} with id: {id} ??
        </p>
        <div className="w-full p-2 flex justify-center items-center gap-4">
          <Button variant="destructive" onClick={() => handelDeleteItem}>
            Confirm
          </Button>
          <Button variant="outline" onClick={setOpen(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
