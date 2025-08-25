import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/utils/consts";

export default function AboutOrg() {
  const locale = useLocale();
  const t = useTranslations("AboutOrg");
  const isRtl = locale === Locale.AR;

  return (
    <div className="pt-28 pb-14 px-2 container mx-auto w-full">
      <section className="mb-16">
        <div className={`flex flex-col md:flex-row justify-between gap-8 ${isRtl ? "md:flex-row-reverse" : ""}`}>
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-[#FF6600] mb-12">
              {t("Title")}
            </h1>
            <p className="text-gray-800 leading-relaxed">{t("Description")}</p>
          </div>

          <div className="w-full md:w-1/2">
            <Image
              src="/about_org.png"
              alt={t("ImageAlt")}
              width={750}
              height={350}
              className="rounded-lg object-cover w-full"
            />
          </div>
        </div>
      </section>
      <Separator />

      <div className="grid md:grid-cols-3 gap-8 pt-10" id="vision">
        <section>
          <h2 className="text-3xl font-bold text-[#FF6600] mb-12">
            {t("Vision.Title")}
          </h2>
          <p className="text-gray-800 leading-relaxed">{t("Vision.Description")}</p>
        </section>
        <Separator orientation="vertical" />
        <section>
          <h2 className="text-3xl font-bold text-[#FF6600] mb-12">
            {t("Mission.Title")}
          </h2>
          <p className="text-gray-800 leading-relaxed">{t("Mission.Description")}</p>
        </section>
      </div>
    </div>
  );
}
