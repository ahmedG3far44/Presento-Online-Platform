import { cn } from "@/lib/utils";
function Container({ children, className }) {
  return (
    <section
      className={cn(
        "lg:w-3/4  max-md:w-4/5 m-auto  max-sm:w-screen  p-8   overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
}

export default Container;
