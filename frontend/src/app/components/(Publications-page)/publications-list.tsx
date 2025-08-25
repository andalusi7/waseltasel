/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { BASE_URL, useStrapiData } from "@/hooks/useStrapiData";
import { useState } from "react";
import { Pagination } from "@/components/(Projects-page)/pagination";

export default function PublicationsList() {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const toggleCategoryFilter = (categoryName: string) => {
    console.log("categoryName", categoryName);

    setSelectedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
    setCurrentPage(1);
  };

  const queryFilters = selectedCategory
    ? `filters[categories_publications][name][$eq]=${selectedCategory}`
    : "";

  const {
    data: publications,
    meta,
    loading: publicationsLoading,
    error: publicationsError,
  } = useStrapiData(
    "publications",
    locale,
    `&populate=*&${queryFilters}`,
    currentPage,
    pageSize
  );

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useStrapiData("categories-publications", locale);

  const t = useTranslations("Publications");

  if (publicationsLoading || categoriesLoading)
    return <p className="min-h-96"></p>;
  if (publicationsError || categoriesError)
    return (
      <p className="pt-24 pb-12 container mx-auto flex justify-center">
        Error: {publicationsError} {categoriesError}
      </p>
    );

  console.log(categories);

  return (
    <div className="pt-14 px-2 container mx-auto">
      <div>
        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-8 my-11">
          {categories?.map((category: any) => (
            <Button
              key={category.id}
              variant={"link"}
              className={cn(
                "w-56 h-[53px] text-[#FF6600] border border-[#FF6600] rounded-xl",
                selectedCategory === category.name && "bg-[#FF6600] text-white"
              )}
              onClick={() => toggleCategoryFilter(category.name)}
            >
              {selectedCategory === category.name
                ? `✕ ${category.name}`
                : category.name}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        {!publications || publications.length === 0 ? (
          <p className="w-full flex justify-center">
            {t("NoPublicationsAvailable")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications?.map((project: any, i: number) => (
              <Link
                href={`/publications/${project.documentId}`}
                key={project.id}
                className={cn(i === 0 ? "md:col-span-2" : "")}
              >
                <div
                  className={cn(
                    "group relative flex flex-col gap-6 justify-between hover:cursor-pointer px-4 md:px-0"
                  )}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={
                        project.thumbnail?.url || BASE_URL + "/job_post_img.svg"
                      }
                      alt={project.title}
                      className="object-cover w-full h-[445px] transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex justify-end gap-2 z-10">
                      {project.categories_publications?.map((category: any) => (
                        <span
                          key={category.id}
                          className="py-2 px-4 text-sm bg-[#00000080] text-white rounded-full backdrop-blur-3xl"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fixed Title Height */}
                  <h3
                    className={cn(
                      "text-3xl font-bold border-b border-[#727272] truncate pb-10",
                      i === 0 ? "text-[#FF6600]" : "text-[#454545]"
                    )}
                  >
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
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
