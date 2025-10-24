
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import petImage1 from '@assets/generated_images/Happy_dog_with_smart_feeder_71b15682.png';
import petImage2 from '@assets/generated_images/Orange_cat_with_automatic_feeder_52d8ca7e.png';
import petImage3 from '@assets/generated_images/Pet_owner_using_smart_app_a0e38c58.png';
import petImage4 from '@assets/generated_images/Smart_feeder_device_6415df93.png';

const dashboardImages = [
  {
    src: petImage1,
    alt: 'Perro feliz con comedero inteligente',
  },
  {
    src: petImage2,
    alt: 'Gato naranja con comedero automático',
  },
  {
    src: petImage3,
    alt: 'Dueño usando la app inteligente',
  },
  {
    src: petImage4,
    alt: 'Dispositivo dispensador inteligente',
  },
];

export function DashboardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dashboardImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? dashboardImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dashboardImages.length);
  };

  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card shadow-lg">
        <img
          src={dashboardImages[currentIndex].src}
          alt={dashboardImages[currentIndex].alt}
          className="w-full h-full object-contain transition-opacity duration-500"
          data-testid={`img-dashboard-carousel-${currentIndex}`}
        />
        
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm hover-elevate"
            onClick={goToPrevious}
            data-testid="button-dashboard-carousel-prev"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm hover-elevate"
            onClick={goToNext}
            data-testid="button-dashboard-carousel-next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {dashboardImages.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
            }`}
            onClick={() => setCurrentIndex(index)}
            data-testid={`button-dashboard-carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
