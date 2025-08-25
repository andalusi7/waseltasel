/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useStrapiData } from "@/hooks/useStrapiData";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Locale } from "@/utils/consts";

export default function JobsFilter({
  className,
  onFilterChange,
}: {
  className?: string;
  onFilterChange: (filters: any) => void;
}) {
  const locale = useLocale();
  const isRtl = locale === Locale.AR;
  const t = useTranslations("JobsFilter");

  // Fetch filter data from Strapi
  const { data: jobTypes } = useStrapiData("job-types", locale);
  const { data: jobLocations } = useStrapiData("job-locations", locale);
  const { data: jobAdvertisers } = useStrapiData("job-advertisers", locale);
  const { data: jobSpecializations } = useStrapiData(
    "job-specializations",
    locale
  );

  const defaultFilters = {
    jobType: "",
    location: "",
    advertiser: "",
    specialization: "",
  };
  const [selectedFilters, setSelectedFilters] = useState(defaultFilters);

  const updateFilters = (field: string, value: string) => {
    const newFilters = { ...selectedFilters, [field]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    setSelectedFilters(defaultFilters); // Reset state
    onFilterChange(defaultFilters); // Reset filters in JobsBoard
  };

  return (
    <div className={className}>
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-[#FF6600] lg:mb-10">
          {t("Title")}
        </h1>

        <div className="bg-[#EBEBEB] p-[15px] rounded-xl flex flex-col gap-4">
          {/* Job Type Filter */}
          <div className="bg-white rounded-xl p-4 space-y-2">
            <label className="text-sm font-bold text-[#FF6600]">
              {t("JobType")}
            </label>
            <Select
              value={selectedFilters.jobType}
              onValueChange={(value) => updateFilters("jobType", value)}
            >
              <SelectTrigger
                style={{ direction: isRtl ? "rtl" : "ltr" }}
                className="text-[#727272] focus:ring-0 focus:ring-offset-0"
              >
                <SelectValue placeholder={t("JobTypePlaceholder")} />
              </SelectTrigger>
              <SelectContent className="text-[#727272]">
                {jobTypes?.map((type: any) => (
                  <SelectItem key={type.id} value={type.type}>
                    {type.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div className="bg-white rounded-xl p-4 space-y-2">
            <label className="text-sm font-bold text-[#FF6600]">
              {t("Location")}
            </label>
            <Select
              value={selectedFilters.location}
              onValueChange={(value) => updateFilters("location", value)}
            >
              <SelectTrigger
                style={{ direction: isRtl ? "rtl" : "ltr" }}
                className="text-[#727272] focus:ring-0 focus:ring-offset-0"
              >
                <SelectValue placeholder={t("LocationPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="text-[#727272]">
                {jobLocations?.map((location: any) => (
                  <SelectItem key={location.id} value={location.location}>
                    {location.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Advertiser Filter */}
          <div className="bg-white rounded-xl p-4 space-y-2">
            <label className="text-sm font-bold text-[#FF6600]">
              {t("Advertiser")}
            </label>
            <Select
              value={selectedFilters.advertiser}
              onValueChange={(value) => updateFilters("advertiser", value)}
            >
              <SelectTrigger
                style={{ direction: isRtl ? "rtl" : "ltr" }}
                className="text-[#727272] focus:ring-0 focus:ring-offset-0"
              >
                <SelectValue placeholder={t("AdvertiserPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="text-[#727272]">
                {jobAdvertisers?.map((advertiser: any) => (
                  <SelectItem key={advertiser.id} value={advertiser.advertiser}>
                    {advertiser.advertiser}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Specializations Filter (Restored) */}
          <div className="bg-white rounded-xl p-4 space-y-2">
            <label className="text-sm font-bold text-[#FF6600]">
              {t("Specializations")}
            </label>
            <Select
              value={selectedFilters.specialization}
              onValueChange={(value) => updateFilters("specialization", value)}
            >
              <SelectTrigger
                style={{ direction: isRtl ? "rtl" : "ltr" }}
                className="text-[#727272] focus:ring-0 focus:ring-offset-0"
              >
                <SelectValue placeholder={t("SpecializationPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="text-[#727272]">
                {jobSpecializations?.map((specialization: any) => (
                  <SelectItem
                    key={specialization.id}
                    value={specialization.specialization}
                  >
                    {specialization.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {/* <Button className="flex-1 font-bold bg-[#FF6600] hover:bg-[#d55718] text-white">
              {t("Search")}
            </Button> */}
            <Button
              variant="outline"
              className="border-0 font-bold text-[#FF6600] w-full"
              onClick={handleClearFilters}
            >
              {t("Clear")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
