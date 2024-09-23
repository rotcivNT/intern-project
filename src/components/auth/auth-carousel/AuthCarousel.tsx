import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCallback, useEffect, useRef, useState } from "react";
import DotButton from "./DotButton";
import { useTranslation } from "react-i18next";

const carouselData = [
  {
    imagePath: "./assets/banner-1.png",
  },
  {
    imagePath: "./assets/banner-2.png",
  },
  {
    imagePath: "./assets/banner-3.png",
  },
];

export default function AuthCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const { t } = useTranslation("auth");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const carousels = t("carousels", { returnObjects: true });
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
            <div
              className={`${
                index === 0 ? "pb-0" : "pb-[250px]"
              } relative flex justify-center pt-[60px] mx-auto h-full max-h-full`}
            >
              <div
                className={`px-6 mx-auto w-full text-center ${
                  index === 1 && "relative xl:top-[60px]"
                }`}
              >
                <img src={item.imagePath} className="max-h-full inline-block" />
              </div>
              <p className=" max-w-[520px] flex flex-col w-full items-center gap-4 absolute bottom-[120px] left-1/2 -translate-x-1/2 text-[#f6f9fe]">
                <span className="text-[40px] font-[500] leading-[46px]">
                  {carousels[index].title}
                </span>
                <span className="text-lg leading-[21px]">
                  {carousels[index].description}
                </span>
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
