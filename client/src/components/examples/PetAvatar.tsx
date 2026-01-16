import PetAvatar from '../PetAvatar';

export default function PetAvatarExample() {
  return (
    <div className="flex gap-4 items-center p-4">
      <PetAvatar name="Bandida" imageUrl="/graficas/bandida.jpg" size="sm" />
      <PetAvatar name="Bruno" imageUrl="/graficas/bruno.jpg" size="md" />
      <PetAvatar name="Bella" size="lg" />
    </div>
  );
}
