export default function PagesIntro({
  backgroundUrl,
  title,
}: {
  backgroundUrl: string;
  title: string;
}) {
  return (
    <div
      className="relative h-[415px] w-auto bg-no-repeat bg-cover"
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
      <div className="absolute -bottom-12 w-full px-2">
        <h1 className="bg-[#87878799] backdrop-blur-xl text-white font-bold container mx-auto text-center text-4xl md:text-5xl py-10 rounded-xl">
          {" "}
          {title}{" "}
        </h1>
      </div>
    </div>
  );
}
