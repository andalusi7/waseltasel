"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const prioritiesData = [
  {
    id: 1,
    title: "Empowerment.Title",
    description: "Empowerment.Description",
    imageSrc: "./priorities/1.svg",
  },
  {
    id: 2,
    title: "HumanitarianAid.Title",
    description: "HumanitarianAid.Description",
    imageSrc: "./priorities/2.svg",
  },
  {
    id: 3,
    title: "PreventingExtremism.Title",
    description: "PreventingExtremism.Description",
    imageSrc: "./priorities/3.svg",
  },
  {
    id: 4,
    title: "EnvironmentalProtection.Title",
    description: "EnvironmentalProtection.Description",
    imageSrc: "./priorities/4.svg",
  },
];

export default function Priorities({ more = false }: { more?: boolean }) {
  const t = useTranslations("Priorities");
  const router = useRouter();

  return (
    <div className="py-14 px-2 container mx-auto w-full" id="priorities">
      <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row justify-between items-center mb-14">
        <h1 className="text-[#FF6600] text-4xl font-bold">
          {t("HeaderTitle")}
        </h1>
        {more && (
          <Button
            onClick={() => router.push("/about")}
            variant={"outline"}
            className="text-sm px-2"
          >
            {t("More")}
            <PlusIcon size={1} />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
        {prioritiesData.map((item) => (
          <div
            key={item.id}
            className="relative h-80 max-w-80 overflow-hidden group border rounded-xl border-[#F60] w-full"
          >
            <div className="absolute inset-0 bg-[#F60] transition-transform duration-300 transform group-hover:-translate-y-full">
              <div className="flex flex-col justify-center h-full space-y-6">
                <Image
                  src={item.imageSrc}
                  width={197}
                  height={170}
                  alt={item.title}
                  className="mx-auto text-center"
                />
                <h2 className="text-white text-2xl font-bold text-center">
                  {t(item.title)}
                </h2>
              </div>
            </div>

            <div className="absolute inset-0 bg-white transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
              <div className="flex flex-col h-full">
                <p className="text-sm leading-normal px-4 pt-10">
                  {t(item.description)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
