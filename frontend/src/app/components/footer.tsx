import { Locale } from "@/utils/consts";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");
  const isRtl = locale === Locale.AR;

  return (
    <footer className="py-16 container mx-auto px-4 text-white bg-[#FF6600] rounded-t-xl">
      <div className="flex flex-col sm:px-14">
        <div className="mb-12">
          <Image
            src={
              isRtl ? "/logo_text_white_ar.svg" : "/logo_text_white_en.svg"
            }
            alt="Wasel Tasel Humanitarian Foundation"
            width={245}
            height={50}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Foundation Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light mb-6">{t("Foundation")}</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-xl font-bold hover:underline">
                  {t("AboutUs")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-xl font-bold hover:underline">
                  {t("OurHistory")}
                </Link>
              </li>
              <li>
                <Link href="/about#priorities" className="text-xl font-bold hover:underline">
                  {t("OurPriorities")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Be part of the impact Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light mb-6">{t("BePartOfImpact")}</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-xl font-bold hover:underline">
                  {t("JoinUs")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xl font-bold hover:underline">
                  {t("DonateNow")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Impact Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light mb-6">
              {t("InstitutionalImpact")}
            </h2>
            <ul className="space-y-4">
              <li>
                <Link href="/projects" className="text-xl font-bold hover:underline">
                  {t("Projects")}
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-xl font-bold hover:underline">
                  {t("Publications")}
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-xl font-bold hover:underline">
                  {t("Reports")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light mb-6">{t("ContactUs")}</h2>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.facebook.com/wasel.tasel"
                  target="_blank"
                  className="text-xl font-bold hover:underline"
                >
                  {t("Facebook")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/wasel_tasel"
                  target="_blank"
                  className="text-xl font-bold hover:underline"
                >
                  {t("Instagram")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/company/%D9%85%D8%A4%D8%B3%D8%B3%D8%A9-%D9%88%D8%B5%D9%84-%D8%AA%D8%B5%D9%84-%D8%A7%D9%84%D8%A7%D9%86%D8%B3%D8%A7%D9%86%D9%8A%D8%A9/about/"
                  target="_blank"
                  className="text-xl font-bold hover:underline"
                >
                  {t("LinkedIn")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/@WaselTasel"
                  target="_blank"
                  className="text-xl font-bold hover:underline"
                >
                  {t("YouTube")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
