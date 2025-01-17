import { bannerItems } from "@/constant/banner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCarousel } from "@/hooks/Animation/useCarousel";

const Banner = () => {
  const { setApi, plugin, options } = useCarousel();

  return (
    <Carousel
      plugins={[plugin.current]}
      setApi={setApi}
      opts={options}
      className="w-full"
    >
      <CarouselContent>
        {bannerItems.map((item, index) => (
          <CarouselItem key={index}>
            <img
              src={item.image}
              alt={item.altText}
              className="w-full h-[50vh] lg:h-[90vh] sm:h-[60vh] md:h-[70vh] object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Banner;
