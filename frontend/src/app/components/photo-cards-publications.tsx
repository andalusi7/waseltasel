/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import Link from "next/link";
import { useStrapiData, BASE_URL } from "@/hooks/useStrapiData";
import { useLocale } from "next-intl";

export default function PhotoCardsPublications() {
  const locale = useLocale();

  const {
    data: publications,
    loading,
    error,
  } = useStrapiData("publications", locale, `populate=*`, 1, 3);

  if (loading) return null;
  if (error || !publications || publications.length === 0) return null;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      {publications.map((publication: any) => (
        <div
          key={publication.id}
          className="relative overflow-hidden rounded-lg group w-5/6 sm:w-3/6 mx-auto md:w-1/3 h-[455px]"
        >
          <Link href={`/publications/${publication.documentId}`}>
            <img
              src={publication.thumbnail?.url || BASE_URL + "/job_post_img.svg"}
              alt={publication.title}
              className="object-cover h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 rounded-t-xl bg-[#3838389a] text-white translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
              <h3 className="text-xl font-bold mb-2">
                {publication.title.slice(0, 60)}...
              </h3>
              <p>{publication.content.slice(0, 100)}...</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
