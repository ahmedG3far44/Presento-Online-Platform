import { cn } from "@/lib/utils";
function Container({ children, className }) {
  return (
    <section
      className={cn(
        "2xl:w-8/12 2xl:p-8  lg:w-3/4 lg:p-8 md:w-screen md:p-4 max-sm:w-screen max-sm:p-4  border border-red-300 overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
}

export default Container;
