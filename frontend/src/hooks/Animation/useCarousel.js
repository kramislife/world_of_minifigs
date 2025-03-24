import { useState, useRef, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

// Carousel Configuration
export const carouselConfig = {
  options: {
    loop: true,
    align: "start",
  },
  autoplayOptions: {
    delay: 5000,
    stopOnInteraction: false,
    playOnInit: true,
  },
};

export const useCarousel = () => {
  const [api, setApi] = useState();

  const plugin = useRef(Autoplay(carouselConfig.autoplayOptions));

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      // console.log("current")
    });

    // Handle mouse interactions
    const onMouseEnter = () => {
      plugin.current.stop();
    };

    const onMouseLeave = () => {
      plugin.current.play();
    };

    // Add event listeners to the carousel root element
    api.rootNode().addEventListener("mouseenter", onMouseEnter);
    api.rootNode().addEventListener("mouseleave", onMouseLeave);

    // Cleanup event listeners
    return () => {
      api.rootNode().removeEventListener("mouseenter", onMouseEnter);
      api.rootNode().removeEventListener("mouseleave", onMouseLeave);
    };
  }, [api]);

  return {
    api,
    setApi,
    plugin,
    options: carouselConfig.options,
  };
};
