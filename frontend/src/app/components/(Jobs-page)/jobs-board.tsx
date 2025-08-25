/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Pagination } from "@/components/(Projects-page)/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStrapiData } from "@/hooks/useStrapiData";
import { formatTimeAgo } from "@/utils/timeAgo";
import { Clock, MapPinIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export interface JobLocation {
  id: number;
  location: string;
}
interface JobType {
  id: number;
  documentId: string;
  title: string;
  description: string;
  job_locations: JobLocation[];
  deadline: string;
  image?: { url: string } | null;
  apply_url: string;
  createdAt: string;
}

export default function JobsBoard({
  className,
  filters,
}: {
  className?: string;
  filters: any;
}) {
  const t = useTranslations("JobsList");
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const queryFilters = [];
  if (filters.jobType)
    queryFilters.push(`filters[job_types][type][$eq]=${filters.jobType}`);
  if (filters.location)
    queryFilters.push(
      `filters[job_locations][location][$eq]=${filters.location}`
    );
  if (filters.advertiser)
    queryFilters.push(
      `filters[job_advertisers][advertiser][$eq]=${filters.advertiser}`
    );
  if (filters.specialization)
    queryFilters.push(
      `filters[job_specializations][specialization][$eq]=${filters.specialization}`
    );

  const query = queryFilters.length > 0 ? `&${queryFilters.join("&")}` : "";

  const {
    data: jobs,
    meta,
    loading,
    error,
  } = useStrapiData<JobType>(
    "jobs",
    locale,
    `populate=*${query}`,
    currentPage,
    pageSize
  );

  const [copiedJobId, setCopiedJobId] = useState<number | null>(null);

  const handleShare = async (jobTitle: string, jobId: number) => {
    const jobUrl = `https://www.wasel-tasel.org/jobs/${jobId}`;
    const shareMessage = `${t("shareMessage")} "${jobTitle}".\n ${t(
      "ApplyHere"
    )}: ${jobUrl}`;
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopiedJobId(jobId);
      setTimeout(() => setCopiedJobId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  if (loading) return null;
  if (error) return <p>Error: {error}</p>;
  if (!jobs || jobs.length === 0)
    return <p className="pt-24 mx-auto">{t("NoJobsAvailable")}</p>;

  return (
    <div className={className}>
      {/* Title & Result Count */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#FF6600] mb-2">{t("Title")}</h1>
        <span className="text-[#171717]">
          {t("ShowingResults", {
            count: jobs.length,
            total: meta?.pagination.total,
          })}
        </span>
      </div>

      {/* Jobs List */}
      <div className="flex gap-6">
        <div className="flex flex-col flex-1 space-y-4 bg-[#EBEBEB] p-[15px] rounded-xl">
          {jobs.map((job) => (
            <Card className="border-0 rounded-xl shadow-none" key={job.id}>
              <CardContent className="p-4 flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-between">
                <div className="flex gap-8">
                  <div className="hidden sm:flex rounded-xl border border-[#EBEBEB] min-w-28 min-h-36 justify-center items-center">
                    {job.image ? (
                      <img
                        src={job.image.url}
                        alt={job.title}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    ) : (
                      <img src="./job_post_img.svg" alt="Company Logo" />
                    )}
                  </div>

                  <div>
                    <span className="text-gray-600 text-xs">
                      {formatTimeAgo(job.createdAt, locale as "en" | "ar")}
                    </span>
                    <h2 className="text-xl font-bold mb-4 text-[#454545]">
                      {job.title}
                    </h2>
                    <p className="text-[#171717] text-xs leading-relaxed lg:w-8/12">
                      {job.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 justify-between items-start lg:items-end">
                  <div className="flex gap-1">
                    <div className="flex gap-1">
                      <Clock className="w-3 h-3 text-[#FF6600] mt-1" />
                      <span className="text-[#727272] text-sm">
                        {job.deadline}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {job.job_locations[0]?.location ? (
                        <>
                          <MapPinIcon className="w-3 h-3 text-[#FF6600] mt-1" />
                          <span className="text-[#727272] text-sm">
                            {job.job_locations[0]?.location}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {/* ✅ زر التقديم المعدل */}
                    <a
                      href={job.apply_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FF6600] hover:bg-[#d55718] rounded-xl text-white font-bold w-36 h-12 flex justify-center items-center"
                    >
                      {t("Apply")}
                    </a>

                    <Button
                      className="bg-[#B0B0B0] rounded-xl font-bold w-36 h-12 text-white"
                      onClick={() => handleShare(job.title, job.id)}
                    >
                      {copiedJobId === job.id ? t("Copied") : t("Share")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={meta?.pagination.pageCount || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
