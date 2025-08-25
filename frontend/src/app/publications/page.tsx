"use client";
import PublicationsList from "@/components/(Publications-page)/publications-list";
import Banner from "@/components/banner";
import PagesIntro from "@/components/pages-intro";
import { useTranslations } from "next-intl";

export default function PorjectsPage() {
  const t = useTranslations();

  return (
    <div>
      <PagesIntro
        backgroundUrl="./publications_bg.png"
        title={t("PagesTitles.Publications")}
      />
      <PublicationsList />
      <Banner bannerId="eq6xtdzhjh1dtznpch3tvdyc" />
    </div>
  );
}
