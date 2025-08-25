"use client";
import AboutOrg from "@/components/(About-page)/about-org";
import Priorities from "@/components/priorities";
import ImpactCard from "@/components/impact-card";
import PagesIntro from "@/components/pages-intro";
import { Separator } from "@/components/ui/separator";
import Partners from "@/components/partners";
import Banner from "@/components/banner";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div>
      <PagesIntro
        backgroundUrl="./about_bg.png"
        title={t("PagesTitles.About")}
      />
      <AboutOrg />
      <div className="pb-10 px-2 container mx-auto w-full">
        <ImpactCard />
      </div>
      <Separator />
      <Priorities />
      <Separator />
      <Partners />
      <Banner bannerId="ns6m91jr1g9291mqpd442oro" />
    </div>
  );
}
