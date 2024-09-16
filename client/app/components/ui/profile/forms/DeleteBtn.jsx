"use client";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

function DeleteBtn({ deleteFunction, id }) {
  const status = useFormStatus();
  const { toast } = useToast();
  const handleDelete = async () => {
    await deleteFunction(id)
      .then((response) => {
        toast({
          title: "deleted successful",
          description: response.message,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.error,
          description: error.message,
        });
      });
  };
  return (
    <span
      disabled={status.pending}
      className="text-white block w-20 h-full min-h-full hover:bg-destructive "
      onClick={handleDelete}
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
