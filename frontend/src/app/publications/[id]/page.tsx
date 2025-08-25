/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Banner from "@/components/banner";
import PagesIntro from "@/components/pages-intro";
import { Separator } from "@radix-ui/react-separator";
import { useParams } from "next/navigation";
import { useStrapiData, BASE_URL } from "@/hooks/useStrapiData";
import ReactMarkdown from "react-markdown";
import { useLocale } from "next-intl";
import remarkGfm from "remark-gfm";
import PhotoCardsPublications from "@/components/photo-cards-publications";

interface PublicationType {
  id: number;
  documentId: string;
  title: string;
  content: string;
  thumbnail?: {
    url: string;
  } | null;
  pdfFile?: {
    name: string;
    url: string;
  } | null;
}

export default function SinglePage() {
  const locale = useLocale();
  const { id } = useParams();

  const {
    data: publication,
    loading,
    error,
  } = useStrapiData<PublicationType>(
    "publications",
    locale,
    `filters[documentId][$eq]=${id}&populate=*`
  );

  if (loading) return <p className="min-h-96"></p>;
  if (error || !publication)
    return <p className="text-center py-20">Error loading publication data.</p>;

  const publicationData = publication[0];

  return (
    <div>
      <PagesIntro
        backgroundUrl={
          publicationData.thumbnail?.url || BASE_URL + "/job_post_img.svg"
        }
        title={publicationData.title}
      />

      <div className="container mx-auto w-full">
        <div className="bg-[#EBEBEB] pt-14 rounded-b-xl mb-10">
          <div className="py-10 px-4 mx-auto text-[#171717] prose lg:prose-xl">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-[#FF6600]" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-[#FF6600]" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-[#FF6600]" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h3 className="text-[#FF6600]" {...props} />
                ),
                h5: ({ node, ...props }) => (
                  <h3 className="text-[#FF6600]" {...props} />
                ),
                h6: ({ node, ...props }) => (
                  <h3 className="text-[#FF6600]" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-[#171717]" {...props} />
                ),
                span: ({ node, ...props }) => (
                  <span className="text-[#171717]" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-[#171717]" {...props} />
                ),
                img: ({ node, ...props }) => (
                  <img className="rounded-xl mx-auto" {...props} alt="" />
                ),
              }}
              remarkPlugins={[remarkGfm]}
            >
              {publicationData.content}
            </ReactMarkdown>

            {/* زر تحميل التقرير مع أيقونة */}
            {publicationData.pdfFile?.url && (
              <div className="text-center my-8">
                <a
                  href={publicationData.pdfFile.url}
                  download={publicationData.pdfFile.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 transition no-underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  تحميل الإصدار
                </a>
              </div>
            )}
          </div>
        </div>

        <PhotoCardsPublications />
        <Separator />
        <Banner bannerId="mp1xmnmc6iixppv22tyndy9z" />
      </div>
    </div>
  );
}
