"use client";
import PhotoCardsPublications from "@/components/photo-cards-publications";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Publications() {
  const t = useTranslations("Publications");
  const router = useRouter();

  return (
    <div className="py-14 px-2 container mx-auto w-full">
      <div className="flex flex-col space-y-14 xl:space-y-0 xl:flex-row justify-between">
        <div className="flex flex-col xl:w-4/12">
          <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row justify-between items-center mb-14">
            <h1 className="text-[#FF6600] text-4xl font-bold">{t("Title")}</h1>
            <Button
              onClick={() => router.push("/publications")}
              variant={"outline"}
              className="text-sm px-2"
            >
              {t("More")}
              <PlusIcon />
            </Button>
          </div>
          <p>{t("Description")}</p>
        </div>

        <div className="xl:w-7/12">
          <PhotoCardsPublications />
        </div>
      </div>
    </div>
  );
}
