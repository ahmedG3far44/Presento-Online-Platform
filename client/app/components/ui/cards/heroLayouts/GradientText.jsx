import { cn } from "@/lib/utils";

function GradientText({ children, className }) {
  return <h1 className={cn(`gradient_text`, className)}>{children}</h1>;
}

export default GradientText;
