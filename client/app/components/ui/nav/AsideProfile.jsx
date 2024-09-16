import { cn } from "@/lib/utils";

function AsideProfile({ children, className }) {
  return (
    <aside
      className={cn(
        "lg:w-1/5 w-1/5 sticky left-0 top-0 p-8 bg-card border-r-4   min-h-screen",
        className
      )}
    >
      {children}
    </aside>
  );
}

export default AsideProfile;
