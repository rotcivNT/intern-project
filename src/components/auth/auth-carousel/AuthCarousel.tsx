import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCallback, useEffect, useRef, useState } from "react";
import DotButton from "./DotButton";

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

export default function AuthCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full"
      setApi={setApi}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="h-screen">
        {carouselData.map((item, index) => (
          <CarouselItem key={index}>
            <div className="relative flex justify-center pt-[60px] h-full max-h-full">
              <div className={`px-6 ${index === 1 && "relative top-[100px]"}`}>
                <img
                  src={item.imagePath}
                  className="max-h-screen inline-block"
                />
              </div>
              <p className=" max-w-[520px] flex flex-col w-full items-center gap-4 absolute bottom-[150px] left-1/2 -translate-x-1/2 text-[#f6f9fe]">
                <span className="text-[40px] font-[500]">{item.title}</span>
                <span className="text-lg font-[600]">{item.subTitle}</span>
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2 flex items-center gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <DotButton
            key={index}
            active={index === current}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
}
