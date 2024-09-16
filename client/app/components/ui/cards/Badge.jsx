import { cn } from "@/lib/utils";

function Badge({ text, className }) {
  return (
    <div className="w-fit px-8  bg-gradient-to-br from-blue-500 via-purple-600 py-0 rounded-3xl">
      <h1 className={cn(className, "text-sm text-white")}>{text}</h1>
    </div>
  );
}

export default Badge;
