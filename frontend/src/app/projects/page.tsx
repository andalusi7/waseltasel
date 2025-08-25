"use client";
import ProjectsList from "@/components/(Projects-page)/projects-list";
import Banner from "@/components/banner";
import PagesIntro from "@/components/pages-intro";
import { useTranslations } from "next-intl";

export default function PorjectsPage() {
  const t = useTranslations();

  return (
    <div>
      <PagesIntro backgroundUrl="./projects_bg.png" title={t('PagesTitles.Projects')} />
      <ProjectsList/>
      <Banner bannerId="eq6xtdzhjh1dtznpch3tvdyc" />
    </div>
  );
}
