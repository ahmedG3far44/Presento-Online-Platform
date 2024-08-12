"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

function DeleteBtn({ deleteFunction, id }) {
  const data = useFormStatus();
  const { toast } = useToast();
  return (
    <Button
      variant="destructive"
      type="submit"
      disabled={data.pending}
      onClick={() => {
        deleteFunction(id);
        toast({
          description: `item ${id} is deleted `,
        });
      }}
    >
      {data.pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "delete"
      )}
    </Button>
  );
}

export default DeleteBtn;
