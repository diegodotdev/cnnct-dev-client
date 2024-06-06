import { ReactNode } from "react";
import { cn } from "../lib/utils";

export default function MaxWidthWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-screen-md mx-auto px-5 md:px-0 py-10 flex flex-col gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}
