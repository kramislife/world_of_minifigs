import React from 'react'
import Autoplay from "embla-carousel-autoplay";

// Carousel Configuration
export const carouselConfig = {
  options: {
    loop: true,
    align: "start",
  },
  autoplayOptions: {
    delay: 2000,
    stopOnInteraction: false,
    playOnInit: true,
  },
};

export const useCarousel = () => {
  const [api, setApi] = React.useState();
  
  const plugin = React.useRef(
    Autoplay(carouselConfig.autoplayOptions)
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      // console.log("current")
    });
  }, [api]);

  return {
    api,
    setApi,
    plugin,
    options: carouselConfig.options,
  };
};