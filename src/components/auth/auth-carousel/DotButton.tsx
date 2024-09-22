import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DotButtonProps {
  active?: boolean;
  onClick?: () => void;
}

export default function DotButton({ active, onClick }: DotButtonProps) {
  return (
    <Button
      className={cn(
        "size-3 rounded-full bg-[#fff] focus:outline-none transition-all duration-300 ease-in-out",
        `${active ? "rounded-[10px] w-[50px]" : "opacity-30"}`
      )}
      onClick={onClick}
    />
  );
}
