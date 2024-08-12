"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
function SubmitBtn({ state }) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="outline"
      className={`w-full disabled:bg-gray-400`}
      type="submit"
      disabled={pending}
    >
      {state === "update" ? (
        <span>{pending ? "updating..." : "update"}</span>
      ) : (
        <span>{pending ? "adding..." : "add"}</span>
      )}
    </Button>
  );
}
export default SubmitBtn;
