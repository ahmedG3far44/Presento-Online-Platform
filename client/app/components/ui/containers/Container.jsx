import { cn } from "@/lib/utils";
function Container({ children, className }) {
  return (
    <section
      className={cn(
        "lg:w-3/4 lg:m-auto lg:p-8 max-md:w-4/5  max-sm:w-screen max-sm:p-4 max-md:p-4  border border-red-100 overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
}

export default Container;
