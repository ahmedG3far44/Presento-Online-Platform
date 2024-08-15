"use client";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

function DeleteBtn({ deleteFunction, id }) {
  const status = useFormStatus();
  const { toast } = useToast();
  return (
    <span
      disabled={status.pending}
      className="text-white block w-20 h-full min-h-full hover:bg-destructive "
      onClick={() => {
        deleteFunction(id);
        toast({
          description: `item ${id} is deleted `,
        });
      }}
    >
      {status.pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "delete"
      )}
    </span>
  );
}

export default DeleteBtn;
