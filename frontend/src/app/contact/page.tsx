"use clint";
import Banner from "@/components/banner";
import PagesIntro from "@/components/pages-intro";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Locale } from "@/utils/consts";
import { MapIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const t = useTranslations();
  const tContact = useTranslations("Contact");
  const tFeedback = useTranslations("Feedback");

  const locale = useLocale();
  const isRtl = locale === Locale.AR;
  return (
    <div>
      <PagesIntro
        backgroundUrl="./contact_bg.png"
        title={t("PagesTitles.Contact")}
      />
      <div className="pt-24 px-4 container mx-auto">
        {/* Contact Offices Section */}
        <div className="flex flex-col space-y-8 sm:flex-row sm:space-y-0 justify-between pb-16">
          <div className="flex flex-col w-full">
            <h2 className="text-3xl font-bold text-[#FF6600]">
              {tContact("Title")}
            </h2>

            <div className="flex flex-col gap-8  lg:flex-row lg:gap-48 mt-8">
              <div className="space-y-4 text-[#171717]">
                <div>
                  <h3 className="font-bold">{tContact("Offices.0.name")}</h3>
                  <p>{tContact("Offices.0.location")}</p>
                </div>
                <div>
                  <p className={cn(isRtl && "text-right")} dir="ltr">
                    <a
                      href={`tel:${tContact("Offices.0.phone")}`}
                      className="hover:underline"
                    >
                      {tContact("Offices.0.phone")}
                    </a>
                  </p>
                  <a
                    href={`mailto:${tContact("Offices.0.email")}`}
                    className="hover:underline"
                    target="_blank"
                  >
                    {tContact("Offices.0.email")}
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">{tContact("Offices.1.name")}</h3>
                  <p>{tContact("Offices.1.location")}</p>
                </div>
                <div>
                  <p className={cn(isRtl && "text-right")} dir="ltr">
                    <a
                      href={`tel:${tContact("Offices.1.phone")}`}
                      className="hover:underline"
                    >
                      {tContact("Offices.1.phone")}
                    </a>
                  </p>
                  <a
                    href={`mailto:${tContact("Offices.1.email")}`}
                    className="hover:underline"
                    target="_blank"
                  >
                    {tContact("Offices.1.email")}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-1 mt-3">
              <Link
                href="https://www.facebook.com/wasel.tasel"
                target="_blank"
                className="text-[#FF6600]"
              >
                <Image
                  src="./facebook.svg"
                  width={24}
                  height={24}
                  alt="Facebook"
                />
                <span className="sr-only">
                  {tContact("SocialMedia.Facebook")}
                </span>
              </Link>
              <Link
                href="https://www.instagram.com/wasel_tasel"
                target="_blank"
                className="text-[#FF6600]"
              >
                <Image
                  src="./instagram.svg"
                  width={24}
                  height={24}
                  alt="Instagram"
                />
                <span className="sr-only">
                  {tContact("SocialMedia.Instagram")}
                </span>
              </Link>
              <Link
                  href="https://www.linkedin.com/company/%D9%85%D8%A4%D8%B3%D8%B3%D8%A9-%D9%88%D8%B5%D9%84-%D8%AA%D8%B5%D9%84-%D8%A7%D9%84%D8%A7%D9%86%D8%B3%D8%A7%D9%86%D9%8A%D8%A9/about/"
                  target="_blank"
                className="text-[#FF6600]"
              >
                <Image
                  src="./linkedin.svg"
                  width={24}
                  height={24}
                  alt="LinkedIn"
                />
                <span className="sr-only">
                  {tContact("SocialMedia.LinkedIn")}
                </span>
              </Link>
              <Link
                href="https://www.youtube.com/@WaselTasel"
                target="_blank"
                className="text-[#FF6600]"
              >
                <Image
                  src="./youtube.svg"
                  width={24}
                  height={24}
                  alt="YouTube"
                />
                <span className="sr-only">
                  {tContact("SocialMedia.YouTube")}
                </span>
              </Link>
            </div>
          </div>

          {/* Map Placeholder Section */}
          <div className="min-w-[300px] md:min-w-[400px] xl:min-w-[528px] h-96 bg-[#FF6600]/50 rounded-lg flex items-center justify-center">
            <MapIcon className="w-24 h-24 text-[#FF6600]" />
          </div>
        </div>

        {/* Separator */}
        <Separator />

        {/* Feedback & Complaints Section */}
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 justify-between py-8">
          <div className="space-y-8 lg:w-5/12">
            <h2 className="text-3xl font-bold text-[#FF6600]">
              {tFeedback("Title")}
            </h2>
            <p className="text-[#171717] leading-relaxed">
              {tFeedback("Description")}
            </p>
          </div>

          {/* Complaints Process */}
          <div className="space-y-5 lg:w-[528px]">
            <div>
              <p>{tFeedback("StepsTitle")}</p>
              <p className="font-bold">{tFeedback("ChannelsTitle")}</p>
            </div>
            <ol
              className={cn(
                "list-decimal leading-relaxed",
                isRtl ? "mr-4" : "ml-4"
              )}
            >
              <li>{tFeedback("Steps.0")}</li>
              <li>{tFeedback("Steps.1")}</li>
              <li>{tFeedback("Steps.2")}</li>
              <li>{tFeedback("Steps.3")}</li>
              <li>{tFeedback("Steps.4")}</li>
            </ol>
          </div>
        </div>
      </div>
      <Banner bannerId="vfy0ej7wcol0f2zr5i3p169f" />
    </div>
  );
}
