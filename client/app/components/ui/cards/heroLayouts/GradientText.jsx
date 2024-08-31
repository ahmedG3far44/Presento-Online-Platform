import { cn } from "@/lib/utils";

function GradientText({
  mainColor,
  secondaryColor,
  textSize,
  children,
  className,
}) {
  return (
    <h1
      className={cn(
        `bg-gradient-to-br from-${mainColor}  via-${secondaryColor} text-transparent bg-clip-text text-${textSize}`,
        className
      )}
    >
      {children}
    </h1>
  );
}

export default GradientText;
