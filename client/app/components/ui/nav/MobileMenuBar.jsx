"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

function MobileMenuBar({ className, children }) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      {openMenu ? (
        <div
          onClick={() => setOpenMenu(false)}
          className="hidden w-full h-full overflow-hidden max-sm:flex max-md:flex  justify-start items-start fixed left-0 top-0 z-20"
        >
          <aside
            className={cn(
              "p-4 rounded-md flex-col duration-150 justify-start  slide-menu items-center w-80 h-screen absolute z-50 top-0 right-0 border bg-primary-foreground shadow-md",
              className
            )}
          >
            <div className="w-full min-w-full p-4 ">
              <button
                className="hidden max-sm:flex max-md:flex ml-auto"
                onClick={() => setOpenMenu(false)}
              >
                <span className="hover:text-muted duration-150">
                  <IoClose size={20} />
                </span>
              </button>
            </div>
            {children}
          </aside>
          <div className="w-full bg-zinc-900 opacity-80 h-screen z-30"></div>
        </div>
      ) : (
        <div className="w-full min-w-full p-8 ">
          <button
            className="hidden max-sm:flex max-md:flex ml-auto"
            onClick={() => setOpenMenu(true)}
          >
            <span className="hover:text-muted duration-150">
              <CgMenuRight size={20} />
            </span>
          </button>
        </div>
      )}
    </>
  );
}

export default MobileMenuBar;
