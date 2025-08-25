/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL, useStrapiData } from "@/hooks/useStrapiData";
import { cn } from "@/lib/utils";
import { Locale } from "@/utils/consts";
import { useLocale, useTranslations } from "next-intl";

export default function Partners() {
  const t = useTranslations("Partners");
  const locale = useLocale();
  const isRtl = locale === Locale.AR;

  // Fetch partners from Strapi
  const {
    data: partners,
    loading,
    error,
  } = useStrapiData("partners", locale, "populate=*");

  if (loading) return null;
  if (error || !partners || partners.length === 0) return null;

  return (
    <section className="pt-14 px-2 container mx-auto w-full">
      <h2 className="text-[#FF6600] text-4xl font-bold mb-12">{t("Title")}</h2>
      <div
        className={cn(
          "flex flex-wrap md:flex-nowrap items-center justify-center gap-6",
          isRtl && "flex-row-reverse"
        )}
      >
        {partners.map((partner: any) => (
          <div
            key={partner.id}
            className="relative group transition-all duration-300"
          >
            <img
              src={partner.logo?.url || BASE_URL + "/job_post_img.svg"}
              alt={`${partner.name} logo`}
              className="filter grayscale transition-all duration-300 group-hover:filter-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
