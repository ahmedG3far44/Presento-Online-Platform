"use client";
import { useFormStatus } from "react-dom";
function SubmitBtn({ state }) {
  const { pending } = useFormStatus();
  return (
    <input
      variant="outline"
      className={`w-full disabled:bg-gray-400`}
      type="submit"
      disabled={pending}
      value={
        state === "update" ? (
          <span>{pending ? "updating..." : "update"}</span>
        ) : (
          <span>{pending ? "adding..." : "add"}</span>
        )
      }
    />
  );
}
export default SubmitBtn;
