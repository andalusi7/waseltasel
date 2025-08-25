import CarouselIntro from "@/components/carousel-intro";

export default function Intro() {
  return (
    <div className="bg-[url('/intro_bg.png')] bg-no-repeat bg-cover">
      <div className="container mx-auto h-screen">
        <CarouselIntro />
      </div>
    </div>
  );
}
