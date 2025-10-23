import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import carousel1 from '@assets/generated_images/Happy_dog_with_smart_feeder_71b15682.png';
import carousel2 from '@assets/generated_images/Orange_cat_with_automatic_feeder_52d8ca7e.png';
import carousel3 from '@assets/generated_images/Pet_owner_using_smart_app_a0e38c58.png';

const carouselImages = [
  {
    src: carousel1,
    alt: 'Perro feliz con comedero inteligente',
  },
  {
    src: carousel2,
    alt: 'Gato con comedero automático',
  },
  {
    src: carousel3,
    alt: 'Dueño usando la app',
  },
];

export function BrandCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  return (
    <div className="relative w-full">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-card">
        <img
          src={carouselImages[currentIndex].src}
          alt={carouselImages[currentIndex].alt}
          className="w-full h-full object-cover transition-opacity duration-500"
          data-testid={`img-carousel-${currentIndex}`}
        />
        
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm hover-elevate"
            onClick={goToPrevious}
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm hover-elevate"
            onClick={goToNext}
            data-testid="button-carousel-next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
            }`}
            onClick={() => setCurrentIndex(index)}
            data-testid={`button-carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
