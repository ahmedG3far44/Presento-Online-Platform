"use client";
import { LuShare2 } from "react-icons/lu";
import { useState } from "react";
import { LuCopy } from "react-icons/lu";

function ShareBtn() {
  const [copyState, setCopyState] = useState(false);
  const handleCopyProfileLinkToClipboard = async () => {
    setCopyState(true);
    await navigator.clipboard.writeText(`${window.location}`);
    setTimeout(() => {
      setCopyState(false);
    }, 1000);
  };
  return (
    <button
      onClick={handleCopyProfileLinkToClipboard}
      className="flex justify-center items-center gap-2 relative"
    >
      <span className={copyState ? "text-muted-foreground" : "text-primary"}>
        {copyState ? <LuCopy size={15} /> : <LuShare2 size={15} />}
      </span>
      {copyState && (
        <span className="text-muted-foreground absolute -right-20 rounded-3xl px-2">
          copied
        </span>
      )}
    </button>
  );
}

export default ShareBtn;
