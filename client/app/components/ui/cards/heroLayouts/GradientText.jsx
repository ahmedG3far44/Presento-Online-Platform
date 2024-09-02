import { cn } from "@/lib/utils";

function GradientText({ children, className }) {
  return (
    <h1
      className={cn(
        `bg-gradient-to-br from-purple-500  via-blue-700 text-transparent font-bold bg-clip-text text-4xl max-md:text-3xl max-sm:text-2xl  max-sm:w-full max-md:w-full`,
        className
      )}
    >
      {children}
    </h1>
  );
}

export default GradientText;
