/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Banner from "@/components/banner";
import PagesIntro from "@/components/pages-intro";
import PhotoCards from "@/components/photo-cards";
import { Separator } from "@radix-ui/react-separator";
import { useParams } from "next/navigation";
import { useStrapiData, BASE_URL } from "@/hooks/useStrapiData";
import ReactMarkdown from "react-markdown";
import { useLocale } from "next-intl";
import remarkGfm from "remark-gfm";

interface ProjectType {
  id: number;
  documentId: string;
  title: string;
  content: string;
  thumbnail?: {
    url: string;
  } | null;
}

export default function SinglePage() {
  const locale = useLocale();

  const { id } = useParams();

  const {
    data: project,
    loading,
    error,
  } = useStrapiData<ProjectType>(
    "projects",
    locale,
    `filters[documentId][$eq]=${id}&populate=*`
  );

  if (loading) return <p className="min-h-96"></p>;
  if (error || !project)
    return <p className="text-center py-20">Error loading project data.</p>;

  const projectData = project[0]; // Assign first project safely

  return (
    <div>
      <PagesIntro
        backgroundUrl={
         projectData.thumbnail?.url ||  BASE_URL +  "/job_post_img.svg"
        }
        title={projectData.title}
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
              {projectData.content}
            </ReactMarkdown>
          </div>
        </div>

        <PhotoCards />
        <Separator />
        {/* Banner Section */}
        <Banner bannerId="qxss5ae74ijquiwfbx11myr3" />
      </div>
    </div>
  );
}
