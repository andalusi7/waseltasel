"use client";
import JobsBoard from "@/components/(Jobs-page)/jobs-board";
import JobsFilter from "@/components/(Jobs-page)/jobs-filter";
import PagesIntro from "@/components/pages-intro";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function JobsPage() {
  const t = useTranslations();
  const [filters, setFilters] = useState({});

  return (
    <div>
      <PagesIntro backgroundUrl="./jobs_bg.png" title={t("PagesTitles.Jobs")} />
      <div className="container mx-auto pt-24 pb-14 px-2">
        <div className="flex flex-col lg:flex-row gap-10">
          <JobsFilter className="lg:w-3/12" onFilterChange={setFilters} />
          <JobsBoard className="lg:w-9/12" filters={filters} />
        </div>
      </div>
    </div>
  );
}
