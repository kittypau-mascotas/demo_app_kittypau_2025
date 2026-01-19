import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PetAvatarProps {
  name: string;
  imageUrl?: string | null;
  className?: string;
}

export default function PetAvatar({ name, imageUrl, className }: PetAvatarProps) {
  return (
    <Avatar className={cn("h-12 w-12", className)}>
      <AvatarImage src={imageUrl || ""} alt={name} />
      <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}