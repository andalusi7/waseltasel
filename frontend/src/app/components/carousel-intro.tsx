"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Locale } from "@/utils/consts";
import { useRouter } from "next/navigation";
import { useStrapiData } from "@/hooks/useStrapiData";

interface Slide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  url: string;
}

export default function CarouselIntro() {
  const locale = useLocale();
  const isRtl = locale === Locale.AR;
  const router = useRouter();
  const {
    data: slides,
    loading,
    error,
  } = useStrapiData<Slide>("introslides", locale, "populate=*");

  if (loading) return null;
  if (error) return null;

  return (
    <Carousel className="w-full max-w-xl relative top-1/4 px-2">
      <div className="absolute top-10 right-20 z-10">
        <CarouselPrevious className="bg-[#D8D8D8] border-white rounded-xl text-white font-bold hover:border-white/50 hover:text-white/50" />
        <CarouselNext className="bg-[#D8D8D8] border-white rounded-xl text-white font-bold hover:border-white/50 hover:text-white/50" />
      </div>
      <CarouselContent className={cn(isRtl && "flex-row-reverse")}>
        {slides &&
          slides.map((slide: Slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative md:h-auto rounded-xl bg-[#D8D8D899] backdrop-blur-xl pt-14">
                <div
                  className={cn(
                    "relative h-full flex flex-col justify-around p-8",
                    isRtl ? "text-right" : "text-left"
                  )}
                >
                  <h2
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                    style={{ lineHeight: "55px" }}
                  >
                    {slide.title}
                  </h2>
                  <p className="text-white mb-8 text-lg md:text-xl">
                    {slide.description}
                  </p>
                  <div>
                    <Button
                      onClick={() => router.push(slide.url)}
                      variant="filled"
                      className="text-xs py-4 px-12 rounded-lg font-bold"
                    >
                      {slide.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
