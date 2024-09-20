import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";

const carouselData = [
  {
    imagePath: "./assets/banner-1.png",
    title: "Welcome to TMA Innovation",
    subTitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget blandit nisl.",
  },
  {
    imagePath: "./assets/banner-2.png",
    title: "Welcome to TMA Innovation",
    subTitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget blandit nisl.",
  },
  {
    imagePath: "./assets/banner-3.png",
    title: "Welcome to TMA Innovation",
    subTitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget blandit nisl.",
  },
];

export function AuthCarousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {carouselData.map((item, index) => (
          <CarouselItem key={index}>
            <div className="relative flex justify-center items-center h-full">
              <img src={item.imagePath} className="max-h-screen block" />
              <p className="flex flex-col absolute bottom-0 left-1/2 -translate-x-1/2">
                <span>{item.title}</span>
                <span>{item.subTitle}</span>
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
