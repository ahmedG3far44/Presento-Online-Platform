"use client";
import { LuShare2 } from "react-icons/lu";
import { useState } from "react";

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
    <button onClick={handleCopyProfileLinkToClipboard} className="relative">
      <span>
        <LuShare2 size={20} color={copyState ? "#4b5563" : "#fff"} />
      </span>
      {copyState && (
        <span className="absolute bottom-0 -right-20 border rounded-3xl px-2">
          copied
        </span>
      )}
    </button>
  );
}

export default ShareBtn;
