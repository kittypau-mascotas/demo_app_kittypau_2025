import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming shadcn/ui Avatar components
import { cn } from '@/lib/utils'; // Import cn for utility class merging

interface PetAvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
}

export default function PetAvatar({ name, imageUrl, size = 'md' }: PetAvatarProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
  };

  let avatarSizeClass = '';
  let fallbackTextSizeClass = '';
  switch (size) {
    case 'sm':
      avatarSizeClass = 'h-8 w-8';
      fallbackTextSizeClass = 'text-xs';
      break;
    case 'md':
      avatarSizeClass = 'h-12 w-12';
      fallbackTextSizeClass = 'text-base';
      break;
    case 'lg':
      avatarSizeClass = 'h-16 w-16';
      fallbackTextSizeClass = 'text-lg';
      break;
    case 'responsive':
      avatarSizeClass = 'h-20 w-20 md:h-24 md:w-24';
      fallbackTextSizeClass = 'text-xl md:text-2xl'; // Example responsive sizing
      break;
  }

  return (
    <Avatar className={cn(avatarSizeClass)}>
      {imageUrl && <AvatarImage src={imageUrl} alt={`Avatar de ${name}`} aria-label={`Avatar de ${name}`} />}
      <AvatarFallback className={cn(fallbackTextSizeClass)} aria-label={`Iniciales de ${name}`}>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
