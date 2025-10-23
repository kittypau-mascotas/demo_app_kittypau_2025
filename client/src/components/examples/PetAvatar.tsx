import PetAvatar from '../PetAvatar';
import catAvatar from '@assets/generated_images/Orange_cat_avatar_7c8d31d8.png';
import dogAvatar from '@assets/generated_images/Golden_dog_avatar_cfd73a5f.png';

export default function PetAvatarExample() {
  return (
    <div className="flex gap-4 items-center p-4">
      <PetAvatar name="Luna" imageUrl={catAvatar} size="sm" />
      <PetAvatar name="Max" imageUrl={dogAvatar} size="md" />
      <PetAvatar name="Bella" size="lg" />
    </div>
  );
}
