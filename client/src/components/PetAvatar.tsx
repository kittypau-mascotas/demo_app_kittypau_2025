import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PetAvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
}

export default function PetAvatar({ name, imageUrl, size = 'md' }: PetAvatarProps) {
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-22 w-22',
    responsive: 'h-16 w-16 lg:h-22 lg:w-22',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={imageUrl} alt={name} />
      <AvatarFallback className="bg-chart-2 text-foreground font-semibold">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
